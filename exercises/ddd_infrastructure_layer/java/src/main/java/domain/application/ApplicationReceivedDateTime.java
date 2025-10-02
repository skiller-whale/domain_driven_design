package domain.application;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ApplicationReceivedDateTime {
    private ZonedDateTime value;

    public ApplicationReceivedDateTime(ZonedDateTime value) {
        if (!isUTC(value)) {
            throw new IllegalArgumentException("DateTime must be in UTC");
        }
        this.value = value;
    }

    public ZonedDateTime getValue() {
        return value;
    }

    private boolean isUTC(ZonedDateTime dateTime) {
        return dateTime.getZone().equals(ZoneId.of("UTC"));
    }
}
