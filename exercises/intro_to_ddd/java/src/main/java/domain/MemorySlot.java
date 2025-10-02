package domain;

import java.util.Objects;

public final class MemorySlot {
    private final Standard standard;
    private MemoryStick occupiedBy;

    public MemorySlot(Standard standard) {
        this.standard = standard;
    }

    public CompatibilityResult attach(MemoryStick memoryStick) {
        // If the slot is already occupied, it's incompatible
        if (occupiedBy != null) {
            return CompatibilityResult.incompatible(memoryStick, "Slot already occupied");
        }

        // Check if the memory stick's standard is compatible with the slot's standard
        if (!standard.isCompatibleWith(memoryStick.getStandard())) {
            // If not compatible, return an incompatible result
            return CompatibilityResult.incompatible(memoryStick, "Incompatible memory standard");
        }

        // If compatible and slot is free, occupy the slot and return a compatible result
        occupiedBy = memoryStick;
        return CompatibilityResult.compatible(memoryStick);
    }

    public boolean isOccupied() {
        return occupiedBy != null;
    }

    public Standard getStandard() {
        return standard;
    }
}
