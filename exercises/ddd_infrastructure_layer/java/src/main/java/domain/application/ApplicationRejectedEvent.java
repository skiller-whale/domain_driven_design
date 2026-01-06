package domain.application;

import domain.DomainEvent;

public class ApplicationRejectedEvent implements DomainEvent {
    private final ApplicationId applicationId;

    public ApplicationRejectedEvent(ApplicationId applicationId) {
        this.applicationId = applicationId;
    }

    public ApplicationId getApplicationId() {
        return applicationId;
    }
}
