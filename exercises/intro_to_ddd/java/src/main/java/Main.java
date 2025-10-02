import java.util.List;

import domain.Build;
import domain.CompatibilityResult;
import domain.MemorySlot;
import domain.MemoryStick;
import domain.Motherboard;
import domain.Standard;

public final class Main {
    public static void main(String[] args) {
        Standard ddr4 = new Standard("DDR4");
        Standard ddr3 = new Standard("DDR3");

        Build build = new Build();
        build.addMotherboard(new Motherboard(List.of(new MemorySlot(ddr4), new MemorySlot(ddr4))));
        build.addMemory(new MemoryStick(ddr4));
        build.addMemory(new MemoryStick(ddr4));
        build.addMemory(new MemoryStick(ddr4)); // This one should cause an incompatibility

        var incompatibilityReport = build.validate();
        if (incompatibilityReport.isEmpty()) {
            System.out.println("Build is valid");
        } else {
            System.out.println("Build is invalid");
            for (CompatibilityResult issue : incompatibilityReport) {
                System.out.println(" - " + issue);
            }
        }
    }
}
