package application.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import application.services.GetDetailsService.GetDetailsCommand;
import helpers.RecordingApplicationRepository;

public class GetDetailsServiceTest {
    private static final UUID APPLICATION_ID = UUID.fromString("44444444-4444-4444-4444-444444444444");

    @Test
    void testThrowsWhenNoApplicationCanBeFound() {
        var repo = new RecordingApplicationRepository();
        var service = new GetDetailsService(repo);

        assertThrows(IllegalStateException.class, () -> {
            service.execute(new GetDetailsCommand(APPLICATION_ID));
        });
    }

    @Test
    void returnsAllAvailableFields() throws Exception {
        var existing = helpers.ApplicationFixtures.buildApplicationWithMotivationLetter(APPLICATION_ID);
        var repo = new RecordingApplicationRepository(existing);
        var service = new GetDetailsService(repo);

        var result = service.execute(new GetDetailsCommand(APPLICATION_ID));

        assertEquals(APPLICATION_ID, result.applicationId());
        assertNotNull(result.receivedDateTime());
        assertEquals("Alex Example", result.fullName());
        assertEquals("alex@example.com", result.emailAddress());
        assertEquals("447700900123", result.phoneNumber());
        assertEquals("I am very motivated.", result.motivationLetter());
        assertEquals("Stage Two", result.stageName());
        assertEquals("InProgress", result.statusName());
    }
}
