package domain;

import java.util.Objects;

public final class CompatibilityResult {
    private final boolean compatible;
    private final Component component;
    private final String message;

    public static CompatibilityResult compatible(Component component) {
        return new CompatibilityResult(true, component, "");
    }

    public static CompatibilityResult incompatible(Component component, String message) {
        return new CompatibilityResult(false, component, message);
    }

    private CompatibilityResult(boolean compatible, Component component, String message) {
        this.compatible = compatible;
        this.component = component;
        this.message = Objects.requireNonNullElse(message, "");
    }

    public boolean isCompatible() {
        return compatible;
    }

    public boolean isIncompatible() {
        return !compatible;
    }

    public String message() {
        return message;
    }

    @Override
    public String toString() {
        if (compatible) {
            return "Compatible: " + component.toString();
        }
        return "Incompatible: " + component.toString() + (message.isBlank() ? "" : " - " + message);
    }
}
