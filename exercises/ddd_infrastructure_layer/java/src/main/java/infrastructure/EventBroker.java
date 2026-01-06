package infrastructure;

import java.util.ArrayList;

import domain.DomainEvent;

public interface EventBroker {
  <T extends DomainEvent> void subscribe(Class<T> eventType, EventHandler<T> listener);
  void publish(DomainEvent event) throws Exception;
  void publishAll(ArrayList<DomainEvent> events) throws Exception;
}
