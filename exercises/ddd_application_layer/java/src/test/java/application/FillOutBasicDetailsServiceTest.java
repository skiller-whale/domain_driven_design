package application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import application.FillOutBasicDetailsService.FillOutBasicDetailsCommand;
import domain.application.Application;
import helpers.RecordingApplicationRepository;

public class FillOutBasicDetailsServiceTest {

    @Test
    public void testFillOutBasicDetails() {
        RecordingApplicationRepository repo = new RecordingApplicationRepository();
        FillOutBasicDetailsService service = new FillOutBasicDetailsService(repo);

        service.execute(new FillOutBasicDetailsCommand(
            "Taylor Applicant",
            "441234567890",
            "taylor@example.com"
        ));

        assertEquals(1, repo.saved.size());
        Application saved = repo.saved.get(0);
        assertEquals("Taylor Applicant", saved.getFullName().getValue());
        assertEquals("441234567890", saved.getPhoneNumber().getValue());
        assertEquals("taylor@example.com", saved.getEmailAddress().getValue());
    }

    @Test
    public void testFillOutBasicDetailsInvalidEmail() {
        RecordingApplicationRepository repo = new RecordingApplicationRepository();
        FillOutBasicDetailsService service = new FillOutBasicDetailsService(repo);

        assertThrows(RuntimeException.class, () -> {
            service.execute(new FillOutBasicDetailsCommand(
                "Taylor Applicant",
                "441234567890",
                "not-an-email"
            ));
        });

        assertEquals(0, repo.saved.size());
    }
}
