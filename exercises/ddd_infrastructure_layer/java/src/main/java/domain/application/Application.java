package domain.application;
import domain.application.stages.ApplicationStage;
import domain.application.stages.ApplicationStages;

public class Application {
    private ApplicationId id;
    private ApplicationStage stage = ApplicationStages.ZERO;
    private ApplicationStatus status = ApplicationStatus.IN_PROGRESS;
    private ApplicationReceivedDateTime receivedDateTime;
    private FullName fullName;
    private EmailAddress emailAddress;
    private PhoneNumber phoneNumber;
    private MotivationLetter motivationLetter;

    public Application(ApplicationId id, ApplicationReceivedDateTime receivedDateTime) {
        var fields = new ApplicationFields(id, stage, status, receivedDateTime, null, null, null, null);
        if (!ApplicationStages.ZERO.isValidForStage(fields)) {
            throw new IllegalArgumentException("Invalid data for initial application");
        }
        this.id = id;
        this.receivedDateTime = receivedDateTime;
    }

    public ApplicationId getId() { return id; }
    public ApplicationStage getStage() { return stage; }
    public ApplicationStatus getStatus() { return status; }
    public ApplicationReceivedDateTime getReceivedDateTime() { return receivedDateTime; }
    public FullName getFullName() { return fullName; }
    public EmailAddress getEmailAddress() { return emailAddress; }
    public PhoneNumber getPhoneNumber() { return phoneNumber; }
    public MotivationLetter getMotivationLetter() { return motivationLetter; }

    public void fillOutBasicDetails(FullName fullName, EmailAddress emailAddress, PhoneNumber phoneNumber) {
        var fields = new ApplicationFields(
            this.id,
            this.stage,
            this.status,
            this.receivedDateTime,
            fullName,
            emailAddress,
            phoneNumber,
            this.motivationLetter
        );
        if (!ApplicationStages.ONE.isValidForStage(fields)) {
            throw new IllegalArgumentException("Invalid data or application not in correct stage");
        }
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.stage = ApplicationStages.ONE;
    }

    public void fillOutMotivationLetter(MotivationLetter letter) {
        var fields = new ApplicationFields(
            this.id,
            this.stage,
            this.status,
            this.receivedDateTime,
            this.fullName,
            this.emailAddress,
            this.phoneNumber,
            letter
        );
        if (!ApplicationStages.TWO.isValidForStage(fields)) {
            throw new IllegalArgumentException("Invalid data or application not in correct stage");
        }
        this.motivationLetter = letter;
        this.stage = ApplicationStages.TWO;
    }

    public void approveInitialApplication() {
        var fields = new ApplicationFields(
            this.id,
            this.stage,
            this.status,
            this.receivedDateTime,
            this.fullName,
            this.emailAddress,
            this.phoneNumber,
            this.motivationLetter
        );
        if (!ApplicationStages.THREE.isValidForStage(fields)) {
            throw new IllegalArgumentException("Invalid data or application not in correct stage");
        }
        this.stage = ApplicationStages.THREE;
    }

    public void reject() {
        this.status = ApplicationStatus.REJECTED;
    }


    public boolean equals(Application other) {
        return this.id.equals(other.id);
    }

    public record ApplicationFields(
        ApplicationId id,
        ApplicationStage stage,
        ApplicationStatus status,
        ApplicationReceivedDateTime receivedDateTime,
        FullName fullName,
        EmailAddress emailAddress,
        PhoneNumber phoneNumber,
        MotivationLetter motivationLetter
    ) { }
}

