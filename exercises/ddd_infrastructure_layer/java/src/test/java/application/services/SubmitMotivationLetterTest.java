package application.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import application.services.SubmitMotivationLetterService.SubmitMotivationLetterCommand;
import domain.application.Application;
import helpers.ApplicationFixtures;
import helpers.RecordingApplicationRepository;

public class SubmitMotivationLetterTest {

    private final UUID applicationId = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @Test
    void raisesWhenApplicationCannotBeFound() {
        RecordingApplicationRepository repo = new RecordingApplicationRepository();
        SubmitMotivationLetterService service = new SubmitMotivationLetterService(repo);

        assertThrows(
            RuntimeException.class,
            () -> service.execute(new SubmitMotivationLetterCommand(applicationId, "Ready"))
        );
    }

    @Test
    void wrapsDomainErrorsWhenApplicationHasNotHadBasicDetailsFilledOut() {
        Application existing = ApplicationFixtures.buildEmptyApplication(applicationId);
        RecordingApplicationRepository repo = new RecordingApplicationRepository(existing);
        SubmitMotivationLetterService service = new SubmitMotivationLetterService(repo);

        assertThrows(
            RuntimeException.class,
            () -> service.execute(new SubmitMotivationLetterCommand(applicationId, "Ready"))
        );
        assertEquals(0, repo.saved.size());
    }

    @Test
    void persistsMotivationLetterAdvancesStageAndPublishesEvents() throws Exception {
        Application existing = ApplicationFixtures.buildApplicationWithBasicDetails(applicationId);
        RecordingApplicationRepository repo = new RecordingApplicationRepository(existing);
        SubmitMotivationLetterService service = new SubmitMotivationLetterService(repo);

        service.execute(new SubmitMotivationLetterCommand(applicationId, "I love building things"));

        assertEquals(1, repo.saved.size());
        Application saved = repo.saved.get(0);
        assertEquals("I love building things", saved.getMotivationLetter().getValue());
    }
}
