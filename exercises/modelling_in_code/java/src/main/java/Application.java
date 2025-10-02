import java.util.Objects;

public class Application {
    private ApplicationId id;
    private ApplicationReceivedDateTime receivedDateTime;

    public Application(ApplicationId id, ApplicationReceivedDateTime receivedDateTime) {
        Objects.requireNonNull(id, "ApplicationId cannot be null");
        Objects.requireNonNull(receivedDateTime, "ApplicationReceivedDateTime cannot be null");
        this.id = id;
        this.receivedDateTime = receivedDateTime;
    }

    public boolean equals(Application other) {
        return this.id.equals(other.id);
    }
}

