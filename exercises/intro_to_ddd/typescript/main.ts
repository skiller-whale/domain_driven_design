import { Build } from "./domain/Build";
import { MemorySlot } from "./domain/MemorySlot";
import { MemoryStick } from "./domain/MemoryStick";
import { Motherboard } from "./domain/Motherboard";
import { Standard } from "./domain/Standard";

const ddr4 = new Standard('DDR4');
const ddr3 = new Standard('DDR3');

const build = new Build();
build.addMotherboard(new Motherboard([new MemorySlot(ddr4), new MemorySlot(ddr4)]));
build.addMemory(new MemoryStick(ddr4));
build.addMemory(new MemoryStick(ddr4));
build.addMemory(new MemoryStick(ddr4));

const incompatibilityReport = build.validate();
if (incompatibilityReport.length === 0) {
  console.log('Build is valid');
} else {
  console.log('Build is invalid');
  for (const issue of incompatibilityReport) {
    console.log(` - ${issue.toString()}`);
  }
}
