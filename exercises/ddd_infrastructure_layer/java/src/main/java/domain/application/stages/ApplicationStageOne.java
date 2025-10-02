package domain.application.stages;

import domain.application.Application.ApplicationFields;

public class ApplicationStageOne implements ApplicationStage {
    static final String name = "Stage One";

    protected ApplicationStageOne() { }

    @Override
    public boolean isValidForStage(ApplicationFields applicationFields) {
        return ApplicationStages.ZERO.isValidForStage(applicationFields) &&
                applicationFields.fullName() != null &&
                applicationFields.emailAddress() != null &&
                applicationFields.phoneNumber() != null;
    }

    @Override
    public String getName() {
        return name;
    }
}
