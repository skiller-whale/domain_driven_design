import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import domain.application.Application;

// Feel free to use this test file to try out your objects.
// You can even test-drive them, if you wish!
// Run `gradle test --continuous` in the terminal to run the tests.

public class PlaygroundTest {
    @Test
    void testWorks() {
        assertEquals(1 + 1, 2 );
    }

    @Test
    void testRefusesToConstructWithoutIdAndReceivedDateTime() {
        assertThrows(RuntimeException.class, () -> {
            new Application(null, null);
        });
    }
}
