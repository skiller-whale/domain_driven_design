import type { Component } from "./Component";

export class CompatibilityResult {
  compatible: boolean
  component: Component | null = null
  message: string

  static compatible(component: Component) {
    return new CompatibilityResult(true, component);
  }

  static incompatible(component: Component, message: string) {
    return new CompatibilityResult(false, component, message)
  }

  constructor(compatible: boolean, component: Component | null = null, message: string = '') {
    this.compatible = compatible
    this.component = component
    this.message = message
  }

  isCompatible() {
    return this.compatible
  }

  isIncompatible() {
    return !this.compatible
  }

  toString() {
    if (this.compatible) {
      return `Compatible: ${this.component?.toString()}`;
    } else {
      return `Incompatible: ${this.component?.toString()} - ${this.message}`;
    }
  }
}
