package application.handlers;

import com.google.inject.Inject;

import domain.application.ApplicationRejectedEvent;
import domain.application.ApplicationRepository;
import infrastructure.EmailService;
import infrastructure.EventHandler;

public class EmailOnApplicationRejected implements EventHandler<ApplicationRejectedEvent> {
  private final ApplicationRepository repository;
  private final EmailService emailService;

  @Inject
  public EmailOnApplicationRejected(
      ApplicationRepository repository,
      EmailService emailService
  ) {
    this.repository = repository;
    this.emailService = emailService;
  }

  public void handle(ApplicationRejectedEvent event) throws Exception {
    var application = repository.getById(event.getApplicationId());

    if (application == null) {
      throw new IllegalStateException("Application not found for id " + event.getApplicationId());
    }

    var applicantEmail = application.getEmailAddress().getValue();

    emailService.send(
        applicantEmail,
        "Application Rejected",
        "We are sorry to inform you..."
    );
  }

}
