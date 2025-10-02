package application.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import application.services.RejectService.RejectCommand;
import domain.application.ApplicationStatus;
import helpers.ApplicationFixtures;
import helpers.RecordingApplicationRepository;

public class RejectServiceTest {
    private static final UUID APPLICATION_ID = UUID.fromString("55555555-5555-5555-5555-555555555555");

    @Test
    void testThrowsWhenNoApplicationCanBeFound() {
        var repo = new RecordingApplicationRepository();
        var service = new RejectService(repo);

        assertThrows(IllegalStateException.class, () -> {
            service.execute(new RejectCommand(APPLICATION_ID));
        });
    }

    @Test
    void testMarksApplicationAsRejected() throws Exception {
        var existing = ApplicationFixtures.buildApplicationWithMotivationLetter(APPLICATION_ID);
        var repo = new RecordingApplicationRepository(existing);
        var service = new RejectService(repo);

        service.execute(new RejectCommand(APPLICATION_ID));

        var saved = repo.saved.get(0);
        assertEquals(ApplicationStatus.REJECTED, saved.getStatus());
    }
}
