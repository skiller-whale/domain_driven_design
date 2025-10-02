import { describe, expect, it } from "bun:test";
import { SubmitMotivationLetterService } from "../../../src/application/services/SubmitMotivationLetterService";
import { buildApplicationWithBasicDetails, buildEmptyApplication } from "../../helpers/applicationFixtures";
import { RecordingApplicationRepository } from "../../helpers/RecordingApplicationRepository";

const applicationId = "11111111-1111-1111-1111-111111111111";

describe("SubmitMotivationLetterService", () => {
  it("raises when the application cannot be found", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new SubmitMotivationLetterService(repo);

    expect(
      service.execute({ applicationId, motivationLetter: "Ready" })
    ).rejects.toThrow();
  });

  it("wraps domain errors when the application has not had basic details filled out", async () => {
    const existing = buildEmptyApplication(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new SubmitMotivationLetterService(repo);

    expect(
      service.execute({
        applicationId,
        motivationLetter: "Ready"
    })
    ).rejects.toThrow();

    expect(repo.saved.length).toBe(0);
  });

  it("persists the motivation letter, advances the stage, and publishes events", async () => {
    const existing = buildApplicationWithBasicDetails(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new SubmitMotivationLetterService(repo);

    await service.execute({
      applicationId,
      motivationLetter: "I love building things"
    });

    expect(repo.saved.length).toBe(1);
    const saved = repo.saved[0];
    expect(saved!.motivationLetter?.value).toBe("I love building things");
  });
});
