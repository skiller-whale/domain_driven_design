package application.services;

import com.google.inject.Inject;

import domain.application.ApplicationId;
import domain.application.ApplicationRepository;
import domain.application.EmailAddress;
import domain.application.FullName;
import domain.application.MotivationLetter;
import domain.application.PhoneNumber;

import java.time.ZonedDateTime;
import java.util.UUID;

public final class GetDetailsService {
    private final ApplicationRepository repository;

    @Inject
    public GetDetailsService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public GetDetailsResult execute(GetDetailsCommand command) throws Exception {
        ApplicationId id = new ApplicationId(command.applicationId());
        var application = repository.getById(id);
        if (application == null) {
            throw new IllegalStateException("Application not found for id " + command.applicationId());
        }
        FullName fullName = application.getFullName();
        PhoneNumber phoneNumber = application.getPhoneNumber();
        EmailAddress emailAddress = application.getEmailAddress();
        MotivationLetter motivationLetter = application.getMotivationLetter();

        return new GetDetailsResult(
                application.getId().getValue(),
                application.getReceivedDateTime().getValue(),
                fullName != null ? fullName.getValue() : null,
                phoneNumber != null ? phoneNumber.getValue() : null,
                emailAddress != null ? emailAddress.getValue() : null,
                motivationLetter != null ? motivationLetter.getValue() : null,
                application.getStage().getName(),
                application.getStatus().getValue()
        );
    }

    public record GetDetailsCommand(UUID applicationId) {
    }

    public record GetDetailsResult(
            UUID applicationId,
            ZonedDateTime receivedDateTime,
            String fullName,
            String phoneNumber,
            String emailAddress,
            String motivationLetter,
            String stageName,
            String statusName
    ) {
    }
}
