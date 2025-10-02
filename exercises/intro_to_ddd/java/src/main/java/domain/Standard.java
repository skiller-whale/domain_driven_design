package domain;

import java.util.Objects;

public final class Standard {
    private final String name;

    public Standard(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public boolean isCompatibleWith(Standard other) {
        return this.equals(other);
    }
}
