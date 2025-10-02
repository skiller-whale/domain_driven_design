package application.services;

import java.util.UUID;

import com.google.inject.Inject;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationRepository;
import domain.application.MotivationLetter;

public class SubmitMotivationLetterService {
    private ApplicationRepository repo;

    @Inject
    public SubmitMotivationLetterService(ApplicationRepository repo) {
        this.repo = repo;
    }

    public void execute(SubmitMotivationLetterCommand cmd) throws Exception {
        ApplicationId id = new ApplicationId(cmd.applicationId());
        Application app = repo.getById(id);
        if (app == null) {
            throw new RuntimeException("Application not found");
        }

        try {
            MotivationLetter motivationLetter = new MotivationLetter(cmd.motivationLetter());
            app.fillOutMotivationLetter(motivationLetter);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fill out motivation letter: " + e.getMessage());
        }

        repo.save(app);

    }

    public static record SubmitMotivationLetterCommand(UUID applicationId, String motivationLetter) { }
}
