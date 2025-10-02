package application.services;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import domain.application.ApplicationId;
import helpers.ApplicationFixtures;
import helpers.RecordingApplicationRepository;

public class ApproveInitialApplicationServiceTest {

    private final UUID applicationId = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @Test
    public void testRaiseWhenApplicationNotFound() {
        RecordingApplicationRepository repo = new RecordingApplicationRepository();
        ApproveInitialApplicationService service = new ApproveInitialApplicationService(repo);

        assertThrows(RuntimeException.class, () -> {
            service.execute(new ApproveInitialApplicationService.ApproveInitialApplicationCommand(
                applicationId
            ));
        });
    }

    @Test
    public void testWrapsDomainErrorsWhenApplicationNotAtStageTwo() {
        var existing = ApplicationFixtures.buildApplicationWithBasicDetails(applicationId);
        RecordingApplicationRepository repo = new RecordingApplicationRepository(existing);
        ApproveInitialApplicationService service = new ApproveInitialApplicationService(repo);

        assertThrows(RuntimeException.class, () -> {
            service.execute(new ApproveInitialApplicationService.ApproveInitialApplicationCommand(
                applicationId
            ));
        });

        assert(repo.saved.size() == 0);
    }

    @Test
    public void testPersistsAndAdvancesStage() throws Exception {
        var existing = ApplicationFixtures.buildApplicationWithMotivationLetter(applicationId);
        RecordingApplicationRepository repo = new RecordingApplicationRepository(existing);
        ApproveInitialApplicationService service = new ApproveInitialApplicationService(repo);

        service.execute(new ApproveInitialApplicationService.ApproveInitialApplicationCommand(
            applicationId
        ));

        assert(repo.saved.size() == 1);
        var saved = repo.saved.get(0);
        assert(saved.getStage().getName().equals("Stage Three"));
    }
}
