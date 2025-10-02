package application;

import java.util.UUID;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationRepository;
import domain.application.MotivationLetter;

public class SubmitMotivationLetterService {
    private ApplicationRepository repo;

    public SubmitMotivationLetterService(ApplicationRepository repo) {
        this.repo = repo;
    }

    public void execute(SubmitMotivationLetterCommand cmd) {
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
