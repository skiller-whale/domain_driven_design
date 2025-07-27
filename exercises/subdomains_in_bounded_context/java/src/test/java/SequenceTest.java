import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Application")
class SequenceTest {

    @Nested
    @DisplayName("when an application tests 80% and has an interview score of 9")
    class WhenApplicationTests80AndInterviewScore9 {
        // Example test that should have 80% score: 2 poor, 0 fine, 8 good, 0 great
        // Example interview that should have 9 score: 5 communication, 4 competence
        @Test
        @Disabled("TODO: implement")
        void passes() {
            // TODO: implement test
        }
    }

    @Nested
    @DisplayName("when an application tests under 80% and has an interview score of 9")
    class WhenApplicationTestsUnder80AndInterviewScore9 {
        // Example test that should have 75% score: 0 poor, 5 fine, 5 good, 0 great
        // Example interview that should have 9 score: 5 communication, 4 competence
        @Test
        @Disabled("TODO: implement")
        void fails() {
            // TODO: implement test
        }
    }

    @Nested
    @DisplayName("when an application tests 80% and has an interview score of under 9")
    class WhenApplicationTests80AndInterviewScoreUnder9 {
        // Example test that should have 80% score: 2 poor, 0 fine, 8 good, 0 great
        // Example interview that should have 8 score: 4 communication, 4 competence
        @Test
        @Disabled("TODO: implement")
        void fails() {
            // TODO: implement test
        }
    }

    @Nested
    @DisplayName("ApplicationRepository")
    class ApplicationRepositoryTests {
        @Test
        @Disabled("TODO: implement")
        void persistsAndRetrievesApplications() {
            // 1. Persist an application
            // 2. Retrieve the application
            // 3. Assert that the persisted and retrieved applications are equal
        }
    }
}
