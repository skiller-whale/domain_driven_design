import { beforeEach, expect, it } from "bun:test";
import { ApplicationId } from "../../src/domain/application/ApplicationId";
import { Application } from "../../src/domain/application/Application";
import { ApplicationStatus } from "../../src/domain/application/ApplicationStatus";
import { JSONFileApplicationRepository } from "../../src/infrastructure/JSONFileApplicationRepository";
import { buildApplicationWithBasicDetails, buildApplicationWithMotivationLetter } from "../helpers/applicationFixtures";

if (process.env.RUN_INFRA_TESTS) {

  const TEST_FILE = "data/test-applications.json";
  const applicationUuid = "11111111-1111-1111-1111-111111111111";

  function resetTestFile() {
    const initialData = `[]`; // If your store structure is different, adjust this initial data accordingly
    Bun.write(TEST_FILE, initialData);
  }

  // Ensure the test file is reset before each test
  beforeEach(() => {
    resetTestFile();
  });


  it("stores and retrieves an application with basic details", async () => {
    let repo1 = new JSONFileApplicationRepository(TEST_FILE);
    let application = buildApplicationWithBasicDetails(applicationUuid);
    await repo1.save(application);

    // We create a second repository instance to ensure data is actually read from the file
    let repo2 = new JSONFileApplicationRepository(TEST_FILE);
    let retrieved = await repo2.getById(new ApplicationId(applicationUuid));
    expect(retrieved).toBeDefined();
    expect(retrieved?.id.value).toBe(applicationUuid);
    expect(retrieved?.receivedDateTime.value).toEqual(application.receivedDateTime.value);
    expect(retrieved?.fullName?.value).toBe(application.fullName!.value);
    expect(retrieved?.phoneNumber?.value).toBe(application.phoneNumber!.value);
    expect(retrieved?.emailAddress?.value).toBe(application.emailAddress!.value);
  });

  it("returns undefined when retrieving a non-existent application", async () => {
    let repo = new JSONFileApplicationRepository(TEST_FILE);
    let retrieved = await repo.getById(new ApplicationId("00000000-0000-0000-0000-000000000000"));
    expect(retrieved).toBeUndefined();
  });

  it("stores and retrieves an application with all details", async () => {
    let application = buildApplicationWithMotivationLetter(applicationUuid);
    let repo1 = new JSONFileApplicationRepository(TEST_FILE);
    await repo1.save(application);

    // We create a second repository instance to ensure data is actually read from the file
    let repo2 = new JSONFileApplicationRepository(TEST_FILE);
    let retrieved = await repo2.getById(new ApplicationId(applicationUuid));
    expect(retrieved).toBeDefined();
    expect(retrieved?.id.value).toBe(applicationUuid);
    expect(retrieved?.receivedDateTime.value).toEqual(application.receivedDateTime.value);
    expect(retrieved?.fullName?.value).toBe(application.fullName!.value);
    expect(retrieved?.phoneNumber?.value).toBe(application.phoneNumber!.value);
    expect(retrieved?.emailAddress?.value).toBe(application.emailAddress!.value);
    expect(retrieved?.motivationLetter?.value).toBe(application.motivationLetter!.value);
  });

  it("stores and retrieves a rejected application", async () => {
    const application = buildApplicationWithMotivationLetter(applicationUuid);
    application.reject();
    let repo1 = new JSONFileApplicationRepository(TEST_FILE);
    await repo1.save(application);

    // We create a second repository instance to ensure data is actually read from the file
    let repo2 = new JSONFileApplicationRepository(TEST_FILE);
    let retrieved = await repo2.getById(new ApplicationId(applicationUuid));
    expect(retrieved).toBeDefined();
    expect(retrieved?.id.value).toBe(application.id.value);
    expect(retrieved?.receivedDateTime.value).toEqual(application.receivedDateTime.value);
    expect(retrieved?.fullName?.value).toBe(application.fullName!.value);
    expect(retrieved?.phoneNumber?.value).toBe(application.phoneNumber!.value);
    expect(retrieved?.emailAddress?.value).toBe(application.emailAddress!.value);
    expect(retrieved?.motivationLetter?.value).toBe(application.motivationLetter!.value);
    expect(retrieved?.stage).toBe(application.stage);
    expect(retrieved?.status).toBe(ApplicationStatus.Rejected);
  });
}
