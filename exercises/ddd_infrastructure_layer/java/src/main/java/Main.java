import com.google.inject.Guice;
import com.google.inject.Injector;

import presentation.CLI;

public final class Main {
    private Main() {
    }

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(new AdmissionsModule());
        injector.getInstance(CLI.class).run();
    }
}
