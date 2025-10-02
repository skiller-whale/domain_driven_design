package application.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

import com.google.inject.Inject;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationReceivedDateTime;
import domain.application.ApplicationRepository;
import domain.application.EmailAddress;
import domain.application.FullName;
import domain.application.PhoneNumber;

public class FillOutBasicDetailsService {
  private ApplicationRepository repo;

  @Inject
  public FillOutBasicDetailsService(ApplicationRepository repo) {
    this.repo = repo;
  }

  public FillOutBasicDetailsResult execute(FillOutBasicDetailsCommand cmd) {
    try {
      ApplicationId id = ApplicationId.generate();
      ApplicationReceivedDateTime received = new ApplicationReceivedDateTime(serverTime());
      Application application = new Application(id, received);
      FullName fullName = new FullName(cmd.fullName());
      PhoneNumber phoneNumber = new PhoneNumber(cmd.phoneNumber());
      EmailAddress emailAddress = new EmailAddress(cmd.emailAddress());
      application.fillOutBasicDetails(fullName, emailAddress, phoneNumber);
      repo.save(application);
      return new FillOutBasicDetailsResult(id.getValue());
    } catch (Exception e) {
      throw new RuntimeException("Failed to fill out basic details: " + e.getMessage());
    }
  }

  private ZonedDateTime serverTime() {
    return ZonedDateTime.now(ZoneId.of("UTC"));
  }

  public static record FillOutBasicDetailsCommand(String fullName, String phoneNumber, String emailAddress) {}
  public static record FillOutBasicDetailsResult(UUID applicationId) {}
}
