package infrastructure;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationStatus;
import domain.application.stages.ApplicationStages;
import helpers.ApplicationFixtures;

@Tag("infrastructure")
public final class JSONFileApplicationRepositoryTest {
    private static final Path TEST_FILE = Path.of("data", "test-applications.json");
    private static final UUID APPLICATION_ID = UUID.fromString("11111111-1111-4111-1111-111111111111");
    private static final UUID OTHER_APPLICATION_ID = UUID.fromString("99999999-9999-4999-9999-999999999999");

    @BeforeEach
    void resetTestFile() throws Exception {
        Files.createDirectories(TEST_FILE.getParent());
        Files.writeString(TEST_FILE, "[]");
    }

    @Test
    void storesAndRetrievesApplicationWithBasicDetails() throws Exception {
        Application application = ApplicationFixtures.buildEmptyApplication(APPLICATION_ID);
        JSONFileApplicationRepository repo1 = new JSONFileApplicationRepository(TEST_FILE);

        repo1.save(application);

        JSONFileApplicationRepository repo2 = new JSONFileApplicationRepository(TEST_FILE);
        Application result = repo2.getById(application.getId());

        assertEquals(APPLICATION_ID, result.getId().getValue());
        assertEquals(ApplicationFixtures.FIXED_DATE_TIME, result.getReceivedDateTime().getValue());
        assertEquals("Alex Example", result.getFullName().getValue());
        assertEquals("+447700900123", result.getPhoneNumber().getValue());
        assertEquals("alex@example.com", result.getEmailAddress().getValue());
    }

    @Test
    void returnsNullWhenApplicationDoesNotExist() throws Exception {
        JSONFileApplicationRepository repository = new JSONFileApplicationRepository(TEST_FILE);

        Application retrieved = repository.getById(new ApplicationId(OTHER_APPLICATION_ID));

        assertNull(retrieved);
    }

    @Test
    void storesAndRetrievesApplicationWithAllDetails() throws Exception {
        Application application = ApplicationFixtures.buildApplicationWithMotivationLetter(APPLICATION_ID);
        application.approveInitialApplication();
        JSONFileApplicationRepository repo1 = new JSONFileApplicationRepository(TEST_FILE);

        repo1.save(application);

        JSONFileApplicationRepository repo2 = new JSONFileApplicationRepository(TEST_FILE);
        Application result = repo2.getById(application.getId());

        assertEquals(APPLICATION_ID, result.getId().getValue());
        assertEquals(ApplicationFixtures.FIXED_DATE_TIME, result.getReceivedDateTime().getValue());
        assertEquals("Alex Example", result.getFullName().getValue());
        assertEquals("+447700900123", result.getPhoneNumber().getValue());
        assertEquals("alex@example.com", result.getEmailAddress().getValue());
        assertEquals("I am very motivated to join.", result.getMotivationLetter().getValue());
        assertEquals(ApplicationStages.THREE, result.getStage());
        assertEquals(ApplicationStatus.IN_PROGRESS, result.getStatus());
    }

    @Test
    void storesAndRetrievesRejectedApplication() throws Exception {
        Application application = ApplicationFixtures.buildApplicationWithMotivationLetter(APPLICATION_ID);
        application.reject();
        JSONFileApplicationRepository repo1 = new JSONFileApplicationRepository(TEST_FILE);

        repo1.save(application);

        JSONFileApplicationRepository repo2 = new JSONFileApplicationRepository(TEST_FILE);
        Application result = repo2.getById(application.getId());

        assertEquals(APPLICATION_ID, result.getId().getValue());
        assertEquals(ApplicationFixtures.FIXED_DATE_TIME, result.getReceivedDateTime().getValue());
        assertEquals("Alex Example", result.getFullName().getValue());
        assertEquals("+447700900123", result.getPhoneNumber().getValue());
        assertEquals("alex@example.com", result.getEmailAddress().getValue());
        assertEquals("I am very motivated.", result.getMotivationLetter().getValue());
        assertEquals(ApplicationStages.TWO, result.getStage());
        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
    }
}
