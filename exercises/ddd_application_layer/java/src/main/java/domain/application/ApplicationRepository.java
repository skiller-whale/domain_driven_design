package domain.application;

public interface ApplicationRepository {
    Application getById(ApplicationId id);
    void save(Application application);
}
