package domain;

public final class MemoryStick implements Component {
    private final Standard standard;

    public MemoryStick(Standard standard) {
        this.standard = standard;
    }

    public Standard getStandard() {
        return standard;
    }

    @Override
    public String toString() {
        return "MemoryStick(" + standard.getName() + ")";
    }
}
