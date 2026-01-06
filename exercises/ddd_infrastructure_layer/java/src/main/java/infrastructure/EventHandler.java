package infrastructure;

import domain.DomainEvent;

public interface EventHandler<T extends DomainEvent> {
  void handle(T event) throws Exception;
}
