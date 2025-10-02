import { describe, expect, it } from "bun:test";
import { GetDetailsService } from "../../../src/application/services/GetDetailsService";
import { RecordingApplicationRepository } from "../../helpers/RecordingApplicationRepository";
import { buildApplicationWithMotivationLetter } from "../../helpers/applicationFixtures";

const applicationId = "44444444-4444-4444-4444-444444444444";

describe("GetDetailsService", () => {
  it("throws when no application can be found", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new GetDetailsService(repo);

    await expect(
      service.execute({ applicationId })
    ).rejects.toThrow(`Application not found for id ${applicationId}`);
  });

  it("returns a result with all available fields", async () => {
    const existing = buildApplicationWithMotivationLetter(applicationId);
    const repo = new RecordingApplicationRepository([existing]);
    const service = new GetDetailsService(repo);

    const result = await service.execute({ applicationId });

    expect(result.applicationId).toBe(applicationId);
    expect(result.receivedDateTime).toBe(existing.receivedDateTime.value);
    expect(result.fullName).toBe("Alex Example");
    expect(result.phoneNumber).toBe("447700900123");
    expect(result.emailAddress).toBe("alex@example.com");
    expect(result.motivationLetter).toBe("I love building things");
    expect(result.stageName).toBe("Stage Two");
    expect(result.statusName).toBe("InProgress");
  });
});
