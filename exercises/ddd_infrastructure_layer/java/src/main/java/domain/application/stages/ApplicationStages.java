package domain.application.stages;

public class ApplicationStages {
    public static final ApplicationStage ZERO = new ApplicationStageZero();
    public static final ApplicationStage ONE = new ApplicationStageOne();
    public static final ApplicationStage TWO = new ApplicationStageTwo();
    public static final ApplicationStage THREE = new ApplicationStageThree();

    public static ApplicationStage fromName(String name) {
        return switch (name) {
            case "Stage Zero" -> ZERO;
            case "Stage One" -> ONE;
            case "Stage Two" -> TWO;
            case "Stage Three" -> THREE;
            default -> throw new IllegalArgumentException("Unknown stage name: " + name);
        };
    }
}
