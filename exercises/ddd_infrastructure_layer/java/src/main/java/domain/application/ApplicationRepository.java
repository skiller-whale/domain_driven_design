package domain.application;

public interface ApplicationRepository {
    Application getById(ApplicationId id) throws Exception;
    void save(Application application) throws Exception;
}
