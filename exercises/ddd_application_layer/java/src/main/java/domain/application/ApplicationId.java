package domain.application;
import java.util.UUID;

public class ApplicationId {
    private UUID value;

    public static ApplicationId generate() {
        return new ApplicationId(UUID.randomUUID());
    }

    public ApplicationId(UUID uuid) {
        this.value = uuid;
    }

    public UUID getValue() {
        return value;
    }

    public boolean equals(ApplicationId other) {
        return this.value.equals(other.value);
    }
}

