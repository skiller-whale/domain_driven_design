import { describe, expect, it } from "bun:test";
import { RejectService } from "../../../src/application/services/RejectService";
import { RecordingApplicationRepository } from "../../helpers/RecordingApplicationRepository";
import { ApplicationStatus } from "../../../src/domain/application/ApplicationStatus";
import { buildApplicationWithMotivationLetter } from "../../helpers/applicationFixtures";

const applicationId = "33333333-3333-3333-3333-333333333333";

describe("RejectService", () => {
  it("throws when no application exists", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new RejectService(repo);

    await expect(
      service.execute({ applicationId })
    ).rejects.toThrow(`Application not found for id ${applicationId}`);
  });

  it("marks the application as rejected and publishes an event", async () => {
    const existing = buildApplicationWithMotivationLetter(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new RejectService(repo);

    await service.execute({ applicationId });

    expect(repo.saved.length).toBe(1);
    const saved = repo.saved[0];
    expect(saved!.status).toBe(ApplicationStatus.Rejected);
  });
});
