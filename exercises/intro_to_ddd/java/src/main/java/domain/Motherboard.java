package domain;

import java.util.List;

public final class Motherboard implements Component {
    private final List<MemorySlot> memorySlots;

    public Motherboard(List<MemorySlot> memorySlots) {
        this.memorySlots = memorySlots;
    }

    public CompatibilityResult attachMemory(MemoryStick memory) {
        // Try to attach the memory stick to each memory slot
        for (MemorySlot slot : memorySlots) {

            // If attaching to a slot is successful, return a compatible result
            CompatibilityResult result = slot.attach(memory);
            if (result.isCompatible()) {
                return result;
            }
        }

        // If no slots were compatible, return an incompatible result
        return CompatibilityResult.incompatible(memory, "No available memory slots");
    }

    @Override
    public String toString() {
        return "Motherboard(" + memorySlots.size() + " slots)";
    }
}
