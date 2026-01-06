package infrastructure;

import java.nio.file.Files;

public class FileSavingEmailService implements EmailService {
  private String directory;

  public FileSavingEmailService(String directory) {
    this.directory = directory;
  }

  public void send(String to, String subject, String body) throws Exception {
    String filename = String.format("%s/email_%d.txt", this.directory, System.currentTimeMillis());
    String content = String.format("To: %s\nSubject: %s\n\n%s", to, subject, body);
    Files.writeString(java.nio.file.Paths.get(filename), content);
  }
}
