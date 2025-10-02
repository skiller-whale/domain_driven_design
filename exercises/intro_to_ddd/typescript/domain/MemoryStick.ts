import type { Component } from "./Component"
import type { Standard } from "./Standard"

export class MemoryStick implements Component {
  standard: Standard

  constructor(standard: Standard) {
    this.standard = standard
  }

  toString() {
    return `MemoryStick(${this.standard.name})`
  }
}
