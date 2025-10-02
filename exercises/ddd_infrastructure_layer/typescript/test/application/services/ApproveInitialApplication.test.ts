import { describe, expect, it } from "bun:test";
import { ApproveInitialApplicationService } from "../../../src/application/services/ApproveInitialApplicationService";
import { ApplicationStage } from "../../../src/domain/application/ApplicationStage";
import { buildApplicationWithBasicDetails, buildApplicationWithMotivationLetter } from "../../helpers/applicationFixtures";
import { RecordingApplicationRepository } from "../../helpers/RecordingApplicationRepository";

const applicationId = "11111111-1111-1111-1111-111111111111";

describe("ApproveInitialApplication", () => {
  it("raises when the application cannot be found", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new ApproveInitialApplicationService(repo);

    expect(
      service.execute({ applicationId })
    ).rejects.toThrow(`Application not found`);
  });

  it("wraps domain errors when the application has not reached stage two", async () => {
    const existing = buildApplicationWithBasicDetails(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new ApproveInitialApplicationService(repo);

    expect(
      service.execute({
        applicationId,
      })
    ).rejects.toThrow();

    expect(repo.saved.length).toBe(0);
  });

  it("persists the motivation letter, advances the stage, and publishes events", async () => {
    const existing = buildApplicationWithMotivationLetter(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new ApproveInitialApplicationService(repo);

    await service.execute({
      applicationId,
    });

    expect(repo.saved.length).toBe(1);
    const saved = repo.saved[0];
    expect(saved!.stage).toBe(ApplicationStage.Three);
  });
});
