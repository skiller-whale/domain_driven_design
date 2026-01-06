import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;

import domain.application.ApplicationRepository;
import infrastructure.EmailService;
import infrastructure.EventBroker;
import infrastructure.FileSavingEmailService;
import infrastructure.InMemoryEventBroker;
import infrastructure.JSONFileApplicationRepository;

import java.nio.file.Path;

/**
 * Binds the application's infrastructure components for dependency injection.
 */
public final class AdmissionsModule extends AbstractModule {
    @Override
    protected void configure() {
    }

    @Provides
    @Singleton
    ApplicationRepository provideApplicationRepository() {
        return new JSONFileApplicationRepository(Path.of("data", "applications.json"));
    }

    @Provides
    @Singleton
    EventBroker provideEventBroker() {
        return new InMemoryEventBroker();
    }

    @Provides
    @Singleton
    EmailService provideEmailService() {
        return new FileSavingEmailService("data/emails");
    }
}
