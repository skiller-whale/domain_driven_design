import { Application } from "../../src/domain/application/Application";
import { ApplicationId } from "../../src/domain/application/ApplicationId";
import { ApplicationReceivedDateTime } from "../../src/domain/application/ApplicationReceivedDateTime";
import { EmailAddress } from "../../src/domain/application/EmailAddress";
import { FullName } from "../../src/domain/application/FullName";
import { MotivationLetter } from "../../src/domain/application/MotivationLetter";
import { PhoneNumber } from "../../src/domain/application/PhoneNumber";

export const fixedDateTime = "2024-06-01T12:00:00Z";

export function buildEmptyApplication(id: string): Application {
  const receivedDateTime = new ApplicationReceivedDateTime(fixedDateTime);
  const app = new Application(new ApplicationId(id), receivedDateTime);
  return app;
}

export function buildApplicationWithBasicDetails(id: string): Application {
  const app = buildEmptyApplication(id);
  const fullName = new FullName("Alex Example");
  const phoneNumber = new PhoneNumber("447700900123");
  const emailAddress = new EmailAddress("alex@example.com");
  app.fillOutBasicDetails(fullName, emailAddress, phoneNumber);
  return app;
}

export function buildApplicationWithMotivationLetter(id: string): Application {
  const app = buildApplicationWithBasicDetails(id);
  const motivationLetter = new MotivationLetter("I love building things");
  app.submitMotivationLetter(motivationLetter);
  return app;
}
