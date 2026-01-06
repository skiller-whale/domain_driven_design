import { EmailOnApplicationRejected } from "../application/handlers/EmailOnApplicationRejected";
import { ApproveInitialApplicationService, type ApproveInitialApplicationCommand } from "../application/services/ApproveInitialApplicationService";
import { FillOutBasicDetailsService } from "../application/services/FillOutBasicDetailsService";
import { GetDetailsService } from "../application/services/GetDetailsService";
import { RejectService } from "../application/services/RejectService";
import { SubmitMotivationLetterService } from "../application/services/SubmitMotivationLetterService";
import { ApplicationRejectedEvent } from "../domain/application/ApplicationRejectedEvent";
import type { ApplicationRepository } from "../domain/application/ApplicationRepository";
import { ApplicationStage } from "../domain/application/ApplicationStage";
import type { EventBroker } from "../infrastructure/EventBroker";
import { FileSavingEmailService } from "../infrastructure/FileSavingEmailService";
import { InMemoryEventBroker } from "../infrastructure/InMemoryEventBroker";
import { JSONFileApplicationRepository } from "../infrastructure/JSONFileApplicationRepository";

export class CLI {
  private eventBroker: EventBroker;
  private emailService: FileSavingEmailService;
  private applicationRepo: ApplicationRepository;
  private fillOutBasicDetailsService: FillOutBasicDetailsService;
  private submitMotivationLetterService: SubmitMotivationLetterService;
  private getDetailsService: GetDetailsService;
  private approveInitialApplicationService: ApproveInitialApplicationService;
  private rejectService: RejectService;

  constructor() {
    // A dependency injection container would typically handle this composition

    // Set up infrastructure
    this.applicationRepo = new JSONFileApplicationRepository("./data/applications.json");
    this.eventBroker = new InMemoryEventBroker();
    this.emailService = new FileSavingEmailService('data/emails');

    // Set up application services
    this.fillOutBasicDetailsService = new FillOutBasicDetailsService(this.applicationRepo);
    this.getDetailsService = new GetDetailsService(this.applicationRepo);
    this.submitMotivationLetterService = new SubmitMotivationLetterService(this.applicationRepo);
    this.approveInitialApplicationService = new ApproveInitialApplicationService(this.applicationRepo);
    this.rejectService = new RejectService(this.applicationRepo, this.eventBroker);

    // Set up event handlers
    const emailOnApplicationRejected = new EmailOnApplicationRejected(this.applicationRepo, this.emailService);
    this.eventBroker.subscribe(ApplicationRejectedEvent, emailOnApplicationRejected);
  }

  async run() {
    this.listOptions();
    let action = prompt("Select an action:");
    if (action === "1") {
      this.startNewApplication();
    } else if (action === "2") {
      this.reviewApplication();
    } else {
      console.log("Unknown action");
    }
  }

  private listOptions() {
    console.log("Actions:");
    console.log("1. Start a new application");
    console.log("2. Review an application");
  }

  private async startNewApplication() {
    let fullName = prompt("Full name:") || "";
    let emailAddress = prompt("Email address:") || "";
    let phoneNumber = prompt("Phone number:") || "";
    let result = await this.fillOutBasicDetailsService.execute({
      fullName,
      emailAddress,
      phoneNumber
    });
    console.log(`Application started with ID: ${result.applicationId}`);
    let addLetter = prompt("Add a motivation letter? (Y/n):") || "y";
    if (addLetter?.toLowerCase() !== "n") {
      let letter = prompt("Motivation letter:") || "";
      await this.submitMotivationLetterService.execute({
        applicationId: result.applicationId,
        motivationLetter: letter
      });
      console.log("Motivation letter added.");
    }
    console.log(`Thank you! Your application ${result.applicationId} is now in progress.`);
  }

  private async reviewApplication() {
    let applicationId = prompt("Application ID:") || "";
    let application = await this.getDetailsService.execute({
      applicationId,
    });
    console.log(`Application ID: ${application.applicationId}`);
    console.log(`Received at: ${application.receivedDateTime}`);
    console.log(`Full name: ${application.fullName || "(not set)"}`);
    console.log(`Email address: ${application.emailAddress || "(not set)"}`);
    console.log(`Phone number: ${application.phoneNumber || "(not set)"}`);
    console.log(`Motivation letter: ${application.motivationLetter || "(not set)"}`);
    console.log(`Current stage: ${application.stageName || "(not set)"}`);
    console.log(`Current status: ${application.statusName || "(not set)"}`);

    if (application.stageName == ApplicationStage.Two.name && application.statusName == "InProgress") {
      console.log("Application is ready for review.");
      let accept = prompt("Progress application to stage three? (progress/reject/Ignore):") || "ignore";
      if (accept.toLowerCase() === "progress") {
        await this.approveInitialApplicationService.execute({ applicationId });
        console.log("Application progressed to stage three.");
      } else if (accept.toLowerCase() === "reject") {
        await this.rejectService.execute({ applicationId });
        console.log("Application rejected.");
      } else {
        console.log("No action taken.");
      }
    }
  }
}
