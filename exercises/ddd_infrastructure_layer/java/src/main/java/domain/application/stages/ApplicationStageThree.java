package domain.application.stages;

import domain.application.Application.ApplicationFields;

public class ApplicationStageThree implements ApplicationStage {
    static final String name = "Stage Three";

    protected ApplicationStageThree() { }

    @Override
    public boolean isValidForStage(ApplicationFields applicationFields) {
        return ApplicationStages.TWO.isValidForStage(applicationFields);
    }

    @Override
    public String getName() {
        return name;
    }
}
