package infrastructure;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import domain.DomainEvent;

public class InMemoryEventBroker implements EventBroker {
  private final Map<Class<? extends DomainEvent>, List<EventHandler<? extends DomainEvent>>> handlers = new HashMap<>();

  @Override
  public <T extends DomainEvent> void subscribe(Class<T> eventType, EventHandler<T> listener) {
    handlers.computeIfAbsent(eventType, __ -> new ArrayList<>()).add(listener);
  }

  @Override
  public void publish(DomainEvent event) throws Exception {
    Class<? extends DomainEvent> eventType = event.getClass();
    List<EventHandler<? extends DomainEvent>> eventHandlers = handlers.getOrDefault(eventType, List.of());
    for (EventHandler<? extends DomainEvent> handler : eventHandlers) {
      @SuppressWarnings("unchecked")
      EventHandler<DomainEvent> typedHandler = (EventHandler<DomainEvent>) handler;
      typedHandler.handle(event);
    }
  }

  @Override
  public void publishAll(ArrayList<DomainEvent> events) throws Exception {
    for (DomainEvent event : events) {
      publish(event);
    }
  }
}
