package domain.application.stages;

import domain.application.Application.ApplicationFields;

public class ApplicationStageZero implements ApplicationStage {
    private final String name = "Stage Zero";

    protected ApplicationStageZero() { }

    @Override
    public boolean isValidForStage(ApplicationFields applicationFields) {
        return applicationFields != null &&
                applicationFields.id() != null &&
                applicationFields.receivedDateTime() != null;
     }

    @Override
    public String getName() {
        return name;
    }
}
