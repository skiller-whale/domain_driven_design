package domain.application;
import java.util.Objects;

public class Application {
    private ApplicationId id;
    private ApplicationReceivedDateTime receivedDateTime;
    private FullName fullName;
    private EmailAddress emailAddress;
    private PhoneNumber phoneNumber;
    private MotivationLetter motivationLetter;

    public Application(ApplicationId id, ApplicationReceivedDateTime receivedDateTime) {
        Objects.requireNonNull(id, "ApplicationId cannot be null");
        Objects.requireNonNull(receivedDateTime, "ApplicationReceivedDateTime cannot be null");
        this.id = id;
        this.receivedDateTime = receivedDateTime;
    }

    public ApplicationId getId() { return id; }
    public ApplicationReceivedDateTime getReceivedDateTime() { return receivedDateTime; }
    public FullName getFullName() { return fullName; }
    public EmailAddress getEmailAddress() { return emailAddress; }
    public PhoneNumber getPhoneNumber() { return phoneNumber; }
    public MotivationLetter getMotivationLetter() { return motivationLetter; }

    public void fillOutBasicDetails(FullName fullName, EmailAddress emailAddress, PhoneNumber phoneNumber) {
        Objects.requireNonNull(fullName, "FullName cannot be null");
        Objects.requireNonNull(emailAddress, "EmailAddress cannot be null");
        Objects.requireNonNull(phoneNumber, "PhoneNumber cannot be null");
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
    }

    public void fillOutMotivationLetter(MotivationLetter letter) {
        Objects.requireNonNull(letter, "MotivationLetter cannot be null");
        if (!areBasicDetailsFilledOut()) {
            throw new IllegalStateException("Basic details must be filled out before adding a motivation letter.");
        }
        this.motivationLetter = letter;
    }

    public boolean equals(Application other) {
        return this.id.equals(other.id);
    }

    private boolean areBasicDetailsFilledOut() {
        return fullName != null && emailAddress != null && phoneNumber != null;
    }
}

