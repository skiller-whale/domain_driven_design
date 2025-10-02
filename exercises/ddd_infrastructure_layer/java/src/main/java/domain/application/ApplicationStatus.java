package domain.application;

public enum ApplicationStatus {
    IN_PROGRESS("InProgress"),
    REJECTED("Rejected");

    private final String value;

    ApplicationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
