package domain.application.stages;

import domain.application.Application.ApplicationFields;

public interface ApplicationStage {
    String getName();
    boolean isValidForStage(ApplicationFields application);
}
