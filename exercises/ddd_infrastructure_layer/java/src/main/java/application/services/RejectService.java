package application.services;

import java.util.UUID;

import com.google.inject.Inject;

import domain.application.ApplicationId;
import domain.application.ApplicationRepository;

public final class RejectService {
    private final ApplicationRepository repository;

    @Inject
    public RejectService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public void execute(RejectCommand command) throws Exception {
        ApplicationId id = new ApplicationId(command.applicationId());
        var application = repository.getById(id);
        if (application == null) {
            throw new IllegalStateException("Application not found for id " + command.applicationId());
        }

        try {
            application.reject();
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to reject application: " + ex.getMessage(), ex);
        }

        repository.save(application);
    }

    public record RejectCommand(UUID applicationId) {
    }
}
