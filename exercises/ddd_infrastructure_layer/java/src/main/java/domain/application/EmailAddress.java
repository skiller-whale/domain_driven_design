package domain.application;
public class EmailAddress {
    private final String value;

    public EmailAddress(String value) {
        if (!isValidEmail(value)) {
            throw new IllegalArgumentException("Invalid email address.");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    private boolean isValidEmail(String email) {
        // We would use more robust validation in a real application
        return email != null && email.contains("@") && email.contains(".");
    }
}
