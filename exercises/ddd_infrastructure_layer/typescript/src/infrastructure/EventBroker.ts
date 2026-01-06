import type { DomainEvent } from "../domain/DomainEvent";

export type Constructor<T> = new (...args: any[]) => T;

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}

export interface EventBroker {
  subscribe<T extends DomainEvent>(event: Constructor<T>, listener: EventHandler<T>): void;
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
}
