package domain;

import java.util.ArrayList;
import java.util.List;

public final class Build {
    private Motherboard motherboard;
    private final List<MemoryStick> memorySticks = new ArrayList<>();

    public void addMotherboard(Motherboard motherboard) {
        if (this.motherboard != null) {
            throw new IllegalStateException("Motherboard already added");
        }
        this.motherboard = motherboard;
    }

    public void addMemory(MemoryStick memory) {
        memorySticks.add(memory);
    }

    public List<CompatibilityResult> validate() {
        if (motherboard == null) {
            throw new IllegalStateException("No motherboard added");
        }

        // Go through each memory stick and build a report of incompatibilities
        List<CompatibilityResult> incompatibilityReport = new ArrayList<>();
        for (MemoryStick memoryStick : memorySticks) {

            // Try to attach the memory stick to the motherboard
            CompatibilityResult result = motherboard.attachMemory(memoryStick);

            // If the result is incompatible, add it to the report
            if (result.isIncompatible()) {
                incompatibilityReport.add(result);
            }
        }

        // If there are no incompatibilities, the build is valid
        return incompatibilityReport;
    }
}
