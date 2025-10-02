package infrastructure;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationRepository;

public final class InMemoryApplicationRepository implements ApplicationRepository {
    private final Map<UUID, Application> entries = new ConcurrentHashMap<>();

    @Override
    public Application getById(ApplicationId id) {
        return entries.get(id.getValue());
    }

    @Override
    public void save(Application application) {
        entries.put(application.getId().getValue(), application);
    }
}
