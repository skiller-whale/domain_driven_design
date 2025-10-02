package infrastructure;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationReceivedDateTime;
import domain.application.ApplicationRepository;
import domain.application.ApplicationStatus;
import domain.application.EmailAddress;
import domain.application.FullName;
import domain.application.MotivationLetter;
import domain.application.PhoneNumber;
import domain.application.Application.ApplicationFields;
import domain.application.stages.ApplicationStage;
import domain.application.stages.ApplicationStageOne;
import domain.application.stages.ApplicationStageThree;
import domain.application.stages.ApplicationStageTwo;
import domain.application.stages.ApplicationStageZero;
import domain.application.stages.ApplicationStages;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

public final class JSONFileApplicationRepository implements ApplicationRepository {
    private final Path filePath;

    public JSONFileApplicationRepository(Path filePath) {
        this.filePath = filePath;
    }

     @Override
    public Application getById(ApplicationId id) throws IOException {
        JSONArray store = loadStore();
        // ... @TODO ...
        // 1. Extract the relevant record from the store
        // 2. Reconstitute a valid Application from it
        //    (You will likely want to add a static `reconstitute` method to the Application class)
        return null;
    }

    @Override
    public void save(Application application) throws IOException {
        JSONArray store = loadStore();
        // ... @TODO ...
        // 1. Convert the Application to a suitable record.
        // 2. Determine if an application with the same ID already exists in the store.
        // 3. If it does, update that record with the new details.
        // 4. If it doesn't, add a new record to the store.
        // 5. Save the updated store back to the file.
        saveStore(store);
    }

    private void saveStore(JSONArray store) throws IOException {
        Files.createDirectories(filePath.getParent());
        String json = store.toString();
        Files.writeString(filePath, json);
    }

    private JSONArray loadStore() throws IOException {
        if (!Files.exists(filePath)) {
            return new JSONArray();
        }

        String json = Files.readString(filePath);
        return new JSONArray(json);
    }
}
