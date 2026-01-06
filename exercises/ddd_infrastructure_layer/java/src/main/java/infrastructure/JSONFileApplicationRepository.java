package infrastructure;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.ZonedDateTime;
import java.util.Objects;

import org.json.JSONArray;
import org.json.JSONObject;

import domain.application.Application;
import domain.application.ApplicationId;
import domain.application.ApplicationReceivedDateTime;
import domain.application.ApplicationRepository;
import domain.application.ApplicationStatus;
import domain.application.EmailAddress;
import domain.application.FullName;
import domain.application.MotivationLetter;
import domain.application.PhoneNumber;
import domain.application.stages.ApplicationStages;

public final class JSONFileApplicationRepository implements ApplicationRepository {
    private final Path filePath;

    public JSONFileApplicationRepository(Path filePath) {
        this.filePath = filePath;
    }

    @Override
    public Application getById(ApplicationId id) throws IOException {
        Objects.requireNonNull(id, "id");

        JSONObject record = this.findRecordById(id);

        if (record == null) {
            return null;
        }

        var stage = ApplicationStages.fromName(record.getString("stage"));
        var status = ApplicationStatus.valueOf(record.getString("status"));
        var receivedDateTime = new ApplicationReceivedDateTime(ZonedDateTime.parse(record.getString("receivedDateTime")));

        FullName fullName = null;
        if (!record.isNull("fullName")) {
            fullName = new FullName(record.getString("fullName"));
        }

        PhoneNumber phoneNumber = null;
        if (!record.isNull("phoneNumber")) {
            phoneNumber = new PhoneNumber(record.getString("phoneNumber"));
        }

        EmailAddress emailAddress = null;
        if (!record.isNull("emailAddress")) {
            emailAddress = new EmailAddress(record.getString("emailAddress"));
        }

        MotivationLetter motivationLetter = null;
        if (!record.isNull("motivationLetter")) {
            motivationLetter = new MotivationLetter(record.getString("motivationLetter"));
        }

        return new Application(
            id,
            stage,
            status,
            receivedDateTime,
            fullName,
            emailAddress,
            phoneNumber,
            motivationLetter
        );
    }

    @Override
    public void save(Application application) throws IOException {
        JSONArray store = loadStore();
        JSONObject record = new JSONObject();

        record.put("id", application.getId().getValue().toString());
        record.put("stage", application.getStage().getName());
        record.put("status", application.getStatus().toString());
        record.put("receivedDateTime", application.getReceivedDateTime().getValue().toString());

        record.put("fullName", JSONObject.NULL);
        if (application.getFullName() != null) {
            record.put("fullName", application.getFullName().getValue());
        }

        record.put("phoneNumber", JSONObject.NULL);
        if (application.getPhoneNumber() != null) {
            record.put("phoneNumber", application.getPhoneNumber().getValue());
        }

        record.put("emailAddress", JSONObject.NULL);
        if (application.getEmailAddress() != null) {
            record.put("emailAddress", application.getEmailAddress().getValue());
        }

        record.put("motivationLetter", JSONObject.NULL);
        if (application.getMotivationLetter() != null) {
            record.put("motivationLetter", application.getMotivationLetter().getValue());
        }

        boolean updated = false;
        for (int i = 0; i < store.length(); i++) {
            JSONObject existing = store.getJSONObject(i);
            if (application.getId().getValue().toString().equals(existing.getString("id"))) {
                store.put(i, record);
                updated = true;
                break;
            }
        }
        if (!updated) {
            store.put(record);
        }
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

    private JSONObject findRecordById(ApplicationId id) throws IOException {
        JSONArray store = loadStore();
        for (int i = 0; i < store.length(); i++) {
            JSONObject record = store.getJSONObject(i);
            if (id.getValue().toString().equals(record.getString("id"))) {
                return record;
            }
        }
        return null;
    }
}
