import { describe, expect, it } from "bun:test";
import { FillOutBasicDetailsService } from "../../../src/application/services/FillOutBasicDetailsService";
import { RecordingApplicationRepository } from "../../helpers/RecordingApplicationRepository";

describe("FillOutBasicDetailsService", () => {
  it("persists the new application and publishes resulting events", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new FillOutBasicDetailsService(repo);

    const result = await service.execute({
      fullName: "Taylor Applicant",
      phoneNumber: "441234567890",
      emailAddress: "taylor@example.com",
    });

    expect(result.applicationId).toBeTruthy();

    expect(repo.saved.length).toBe(1);
    const [saved] = repo.saved;
    expect(saved!.fullName!.value).toBe("Taylor Applicant");
    expect(saved!.phoneNumber!.value).toBe("441234567890");
    expect(saved!.emailAddress!.value).toBe("taylor@example.com");
  });

  it("wraps domain validation errors", async () => {
    const repo = new RecordingApplicationRepository();
    const service = new FillOutBasicDetailsService(repo);

    expect(
      service.execute({
        fullName: "Taylor Applicant",
        phoneNumber: "441234567890",
        emailAddress: "not-an-email",
      })
    ).rejects.toThrow();

    expect(repo.saved.length).toBe(0);
  });
});
