package infrastructure;

public interface EmailService {
  void send(String to, String subject, String body) throws Exception;
}
