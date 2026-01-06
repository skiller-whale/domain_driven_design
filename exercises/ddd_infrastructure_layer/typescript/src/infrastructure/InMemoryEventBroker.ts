import type { DomainEvent } from "../domain/DomainEvent";
import type { Constructor, EventBroker, EventHandler } from "./EventBroker";

export class InMemoryEventBroker implements EventBroker {
  private handlers: Map<Constructor<DomainEvent>, EventHandler<DomainEvent>[]> = new Map();

  subscribe<T extends DomainEvent>(event: Constructor<T>, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  async publish(event: any): Promise<void> {
    const eventType = event.constructor;
    const eventHandlers = this.handlers.get(eventType) || [];
    for (const handler of eventHandlers) {
      await handler.handle(event);
    }
  }

  async publishAll(events: any[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}
