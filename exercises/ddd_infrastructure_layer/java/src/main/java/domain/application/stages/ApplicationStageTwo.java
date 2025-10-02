package domain.application.stages;

import domain.application.Application.ApplicationFields;

public class ApplicationStageTwo implements ApplicationStage {
    private final String name = "Stage Two";

    protected ApplicationStageTwo() { }

    @Override
    public boolean isValidForStage(ApplicationFields applicationFields) {
        return ApplicationStages.ONE.isValidForStage(applicationFields) &&
                applicationFields.motivationLetter() != null;
    }

    @Override
    public String getName() {
        return name;
    }
}
