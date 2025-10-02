package application.services;

import java.util.UUID;

import com.google.inject.Inject;

import domain.application.ApplicationId;
import domain.application.ApplicationRepository;

public class ApproveInitialApplicationService {
    private ApplicationRepository repo;

    @Inject
    public ApproveInitialApplicationService(ApplicationRepository repo) {
        this.repo = repo;
    }

    public void execute(ApproveInitialApplicationCommand cmd) throws Exception {
        var applicationId = new ApplicationId(cmd.applicationId());
        var application = repo.getById(applicationId);
        if (application == null) {
            throw new RuntimeException("Application not found for id " + applicationId.getValue());
        }

        try {
            application.approveInitialApplication();
        } catch (Exception e) {
            throw new RuntimeException("Failed to approve initial application: " + e.getMessage());
        }

        repo.save(application);
    }

    public static record ApproveInitialApplicationCommand(UUID applicationId) {}
}
