import { CompatibilityResult } from "./CompatibilityResult"
import type { Component } from "./Component"
import type { MemoryStick } from "./MemoryStick"
import type { Standard } from "./Standard"

export class MemorySlot {
  standard: Standard
  occupiedBy: MemoryStick | null = null

  constructor(standard: Standard) {
    this.standard = standard
  }

  attach(memoryStick: MemoryStick): CompatibilityResult {
    // If the slot is already occupied, it's incompatible
    if (this.occupiedBy) {
      return CompatibilityResult.incompatible(memoryStick, 'Slot already occupied')
    }

    // Check if the memory stick's standard is compatible with the slot's standard
    if (this.standard.isCompatibleWith(memoryStick.standard) === false) {
      // If not compatible, return an incompatible result
      return CompatibilityResult.incompatible(memoryStick, 'Incompatible memory standard')
    }

    // If compatible, occupy the slot and return a compatible result
    this.occupiedBy = memoryStick
    return CompatibilityResult.compatible(memoryStick)
  }
}
