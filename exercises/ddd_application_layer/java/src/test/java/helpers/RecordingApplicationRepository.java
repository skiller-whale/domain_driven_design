package helpers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationRepository;

public class RecordingApplicationRepository implements ApplicationRepository {
    private Map<UUID, Application> store = new HashMap<>();
    public List<Application> saved = new ArrayList<>();

    public RecordingApplicationRepository() {
    }

    public RecordingApplicationRepository(Application initial) {
        this.store.put(initial.getId().getValue(), initial);
    }

    public RecordingApplicationRepository(List<Application> initial) {
        for (Application application : initial) {
            this.store.put(application.getId().getValue(), application);
        }
    }

    @Override
    public Application getById(ApplicationId id) {
        return this.store.get(id.getValue());
    }

    @Override
    public void save(Application application) {
        this.saved.add(application);
        this.store.put(application.getId().getValue(), application);
    }
}
