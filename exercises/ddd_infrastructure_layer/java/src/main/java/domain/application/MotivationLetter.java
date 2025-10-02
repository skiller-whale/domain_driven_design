package domain.application;
public class MotivationLetter {
    private final String value;

    public MotivationLetter(String value) {
        if (!isValidLetter(value)) {
            throw new IllegalArgumentException("Invalid motivation letter.");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    private boolean isValidLetter(String letter) {
        return letter != null && !letter.trim().isEmpty();
    }
}
