#!/usr/bin/env bun

import { $ } from "bun";
import Cryptr from "cryptr";
import path from "node:path";

const thisDir = import.meta.dir;

const password = process.argv[2];
const command = process.argv[3];
const args = process.argv.slice(4);

if (!password) {
  console.log("Usage: coach/helper.ts <password> <command> [<argument>]");
  console.log("Commands:");
  console.log("  init                          Initialize a new store.json file");
  console.log("  check                         Check that the password is correct");
  console.log("  pack <name> <... files>       Encrypt and add files to the store as a pack");
  console.log("  unpack <name>                 Decrypt and retrieve files from the store");
  console.log("  delete <name>                 Delete a pack from the store");
  process.exit(1);
}

const cryptr = new Cryptr(password);

if (command === "init") {
  if (await Bun.file(`${thisDir}/store.json`).exists()) {
    console.log("store.json already exists. Aborting.");
    process.exit(1);
  }
  let initialStore = { checksum: cryptr.encrypt("LOVELY_CHECKSUM"), packs: {} };
  await Bun.write(`${thisDir}/store.json`, JSON.stringify(initialStore, null, 2));
  console.log("Initialized empty store.json");
} else if (command === "check") {
  await assertChecksumCorrect();
  console.log("Password is correct");
} else if (command === "pack") {
  await assertChecksumCorrect();
  let [packName, ...filenames] = args;
  if (!packName || filenames.length === 0) {
    console.log("Usage: coach/helper.ts <password> pack <name> <... files>");
    process.exit(1);
  }

  let pack = [];
  for (let filename of filenames) {
    let filenameRelativeToCwd = filename;
    let filenameRelativeToThisDir = path.relative(thisDir, filenameRelativeToCwd);
    let contents = cryptr.encrypt(await Bun.file(filenameRelativeToCwd).text());
    pack.push({ filename: filenameRelativeToThisDir, contents });
  }

  let store = await Bun.file(`${thisDir}/store.json`).json();
  if (store.packs[packName]) {
    console.log(`Pack '${packName}' already exists. Aborting.`);
    if (prompt("Overwrite? (y/N)")?.toLowerCase() !== "y") {
      process.exit(1);
    }
  }
  store.packs[packName] = pack;
  await Bun.write(`${thisDir}/store.json`, JSON.stringify(store, null, 2));

  console.log(`Pack '${packName}' created with ${pack.length} file(s)`);
} else if (command === "unpack") {
  await assertChecksumCorrect();
  let [packName] = args;
  if (!packName) {
    console.log("Usage: coach/helper.ts <password> unpack <name>");
    process.exit(1);
  }

  let store = await Bun.file(`${thisDir}/store.json`).json();
  let pack = store.packs[packName];
  if (!pack) {
    console.log(`Pack '${packName}' does not exist. Aborting.`);
    process.exit(1);
  }

  for (let file of pack) {
    let filenameRelativeToThisDir = file.filename;
    let absolutePath = path.resolve(thisDir, filenameRelativeToThisDir);
    let contents = cryptr.decrypt(file.contents);
    await Bun.write(absolutePath, contents);
    console.log(`Wrote ${absolutePath}`);
  }
  await $`chown -R 1001 ${thisDir}/..`;

  console.log(`Unpacked ${pack.length} file(s) from pack '${packName}'`);
} else if (command === "show") {
  await assertChecksumCorrect();
  let [packName] = args;
  if (!packName) {
    console.log("Usage: coach/helper.ts <password> unpack <name>");
    process.exit(1);
  }

  let store = await Bun.file(`${thisDir}/store.json`).json();
  let pack = store.packs[packName];
  if (!pack) {
    console.log(`Pack '${packName}' does not exist. Aborting.`);
    process.exit(1);
  }

  for (let file of pack) {
    let filenameRelativeToThisDir = file.filename;
    let contents = cryptr.decrypt(file.contents);
    console.log(`--- ${filenameRelativeToThisDir} ---`);
    console.log(contents);
    console.log();
  }

  console.log(`Displayed ${pack.length} file(s) from pack '${packName}'`);
} else if (command === "delete") {
  await assertChecksumCorrect();
  let [packName] = args;
  if (!packName) {
    console.log("Usage: coach/helper.ts <password> delete <name>");
    process.exit(1);
  }

  let store = await Bun.file(`${thisDir}/store.json`).json();
  let pack = store.packs[packName];
  if (!pack) {
    console.log(`Pack '${packName}' does not exist. Aborting.`);
    process.exit(1);
  }

  delete store.packs[packName];
  await Bun.write(`${thisDir}/store.json`, JSON.stringify(store, null, 2));
  console.log(`Deleted pack '${packName}'`);
} else {
  console.log(`Unknown command '${command}'`);
  process.exit(1);
}

async function assertChecksumCorrect() {
  let store = await Bun.file(`${thisDir}/store.json`).json();
  try {
    cryptr.decrypt(store.checksum);
    return true;
  } catch {
    throw new Error("Incorrect password");
  }
}
