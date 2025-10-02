package helpers;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationReceivedDateTime;
import domain.application.EmailAddress;
import domain.application.FullName;
import domain.application.PhoneNumber;

public class ApplicationFixtures {
    public static Application buildEmptyApplication(UUID id) {
        ApplicationId appId = new ApplicationId(id);
        ZonedDateTime time = ZonedDateTime.now(ZoneId.of("UTC"));
        ApplicationReceivedDateTime receivedDateTime = new ApplicationReceivedDateTime(time);
        Application app = new Application(appId, receivedDateTime);
        return app;
    }

    public static Application buildApplicationWithBasicDetails(UUID id) {
        Application app = buildEmptyApplication(id);
        FullName fullName = new FullName("Alex Example");
        PhoneNumber phoneNumber = new PhoneNumber("447700900123");
        EmailAddress emailAddress = new EmailAddress("alex@example.com");
        app.fillOutBasicDetails(fullName, emailAddress, phoneNumber);
        return app;
    }
}
