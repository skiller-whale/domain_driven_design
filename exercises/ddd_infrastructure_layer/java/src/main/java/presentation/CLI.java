package presentation;

import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Scanner;
import java.util.UUID;

import com.google.inject.Inject;

import application.services.ApproveInitialApplicationService;
import application.services.ApproveInitialApplicationService.ApproveInitialApplicationCommand;
import application.services.FillOutBasicDetailsService;
import application.services.FillOutBasicDetailsService.FillOutBasicDetailsCommand;
import application.services.FillOutBasicDetailsService.FillOutBasicDetailsResult;
import application.services.GetDetailsService;
import application.services.GetDetailsService.GetDetailsCommand;
import application.services.GetDetailsService.GetDetailsResult;
import application.services.RejectService;
import application.services.RejectService.RejectCommand;
import application.services.SubmitMotivationLetterService;
import application.services.SubmitMotivationLetterService.SubmitMotivationLetterCommand;
import domain.application.ApplicationStatus;
import domain.application.stages.ApplicationStages;

public final class CLI {
    private final FillOutBasicDetailsService fillOutBasicDetailsService;
    private final GetDetailsService getDetailsService;
    private final SubmitMotivationLetterService submitMotivationLetterService;
    private final ApproveInitialApplicationService approveInitialApplicationService;
    private final RejectService rejectApplicationService;
    private final Scanner scanner = new Scanner(System.in);

    @Inject
    public CLI(FillOutBasicDetailsService fillOutBasicDetailsService,
               GetDetailsService getDetailsService,
               SubmitMotivationLetterService submitMotivationLetterService,
               ApproveInitialApplicationService approveInitialApplicationService,
               RejectService rejectApplicationService) {
        this.fillOutBasicDetailsService = fillOutBasicDetailsService;
        this.getDetailsService = getDetailsService;
        this.submitMotivationLetterService = submitMotivationLetterService;
        this.approveInitialApplicationService = approveInitialApplicationService;
        this.rejectApplicationService = rejectApplicationService;
    }

    public void run() {
        listOptions();
        String action = prompt("Select an action:");
        switch (action) {
            case "1" -> startNewApplication();
            case "2" -> reviewApplication();
            default -> System.out.println("Unknown action");
        }
    }

    private void listOptions() {
        System.out.println("Actions:");
        System.out.println("1. Start a new application");
        System.out.println("2. Review an application");
    }

    private void startNewApplication() {
        try {
            String fullName = prompt("Full name:");
            String emailAddress = prompt("Email address:");
            String phoneNumber = prompt("Phone number:");
            FillOutBasicDetailsResult result = fillOutBasicDetailsService.execute(new FillOutBasicDetailsCommand(fullName, phoneNumber, emailAddress));
            System.out.printf(Locale.ROOT, "Application started with ID: %s%n", result.applicationId());

            String addLetter = prompt("Add a motivation letter? (Y/n):");
            if (!"n".equalsIgnoreCase(addLetter)) {
                String letter = prompt("Motivation letter:");
                var command = new SubmitMotivationLetterCommand(result.applicationId(), letter);
                submitMotivationLetterService.execute(command);
                System.out.println("Motivation letter added.");
            }
            System.out.printf(Locale.ROOT, "Thank you! Your application %s is now in progress.%n", result.applicationId());
        } catch (Exception ex) {
            System.out.println("Failed to start application: " + ex.getMessage());
        }
    }

    private void reviewApplication() {
        try {
            String applicationIdString = prompt("Application ID:");
            UUID applicationId = UUID.fromString(applicationIdString);
            var command = new GetDetailsCommand(applicationId);
            GetDetailsResult application = getDetailsService.execute(command);
            DateTimeFormatter formatter = DateTimeFormatter.ISO_ZONED_DATE_TIME;
            System.out.printf(Locale.ROOT, "Application ID: %s%n", application.applicationId());
            System.out.printf(Locale.ROOT, "Received at: %s%n", formatter.format(application.receivedDateTime()));
            System.out.printf(Locale.ROOT, "Full name: %s%n", defaultIfBlank(application.fullName()));
            System.out.printf(Locale.ROOT, "Email address: %s%n", defaultIfBlank(application.emailAddress()));
            System.out.printf(Locale.ROOT, "Phone number: %s%n", defaultIfBlank(application.phoneNumber()));
            System.out.printf(Locale.ROOT, "Motivation letter: %s%n", defaultIfBlank(application.motivationLetter()));
            System.out.printf(Locale.ROOT, "Current stage: %s%n", defaultIfBlank(application.stageName()));
            System.out.printf(Locale.ROOT, "Current status: %s%n", defaultIfBlank(application.statusName()));

            if (ApplicationStatus.IN_PROGRESS.getValue().equals(application.statusName()) &&
                    ApplicationStages.TWO.getName().equals(application.stageName())) {
                System.out.println("Application is ready for review.");
                String choice = prompt("Progress application to stage three? (progress/reject/Ignore):");
                switch (choice.toLowerCase(Locale.ROOT)) {
                    case "progress" -> {
                        approveInitialApplicationService.execute(new ApproveInitialApplicationCommand(applicationId));
                        System.out.println("Application progressed to stage three.");
                    }
                    case "reject" -> {
                        rejectApplicationService.execute(new RejectCommand(applicationId));
                        System.out.println("Application rejected.");
                    }
                    default -> System.out.println("No action taken.");
                }
            }
        } catch (Exception ex) {
            System.out.println("Failed to review application: " + ex.getMessage());
        }
    }

    private String prompt(String message) {
        System.out.print(message + " ");
        if (!scanner.hasNextLine()) {
            return "";
        }
        return scanner.nextLine().trim();
    }

    private static String defaultIfBlank(String value) {
        if (value == null || value.isBlank()) {
            return "(not set)";
        }
        return value;
    }
}
