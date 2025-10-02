package domain.application;
public class FullName {
    private final String value;

    public FullName(String value) {
        if (!isValidName(value)) {
            throw new IllegalArgumentException("Invalid full name.");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    private boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty();
    }
}
