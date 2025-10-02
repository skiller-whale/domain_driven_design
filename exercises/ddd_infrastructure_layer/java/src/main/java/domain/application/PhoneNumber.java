package domain.application;
public class PhoneNumber {
    private final String value;

    public PhoneNumber(String value) {
        if (!isValidPhoneNumber(value)) {
            throw new IllegalArgumentException("Invalid phone number.");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    private boolean isValidPhoneNumber(String number) {
        // We would use more robust validation in a real application
        return number != null && number.matches("^\\d+$");
    }
}
