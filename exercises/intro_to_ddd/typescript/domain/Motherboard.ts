import { CompatibilityResult } from "./CompatibilityResult"
import type { Component } from "./Component"
import type { MemorySlot } from "./MemorySlot"
import type { MemoryStick } from "./MemoryStick"

export class Motherboard implements Component {
  memorySlots: MemorySlot[]

  constructor(memorySlots: MemorySlot[]) {
    this.memorySlots = memorySlots
  }

  attachMemory(memory: MemoryStick): CompatibilityResult {
    // Try to attach the memory stick to each memory slot
    for (const slot of this.memorySlots) {

      // If attaching to a slot is successful, return a compatible result
      if (slot.attach(memory).isCompatible()) {
        return CompatibilityResult.compatible(memory)
      }
    }

    // If no slots were compatible, return an incompatible result
    return CompatibilityResult.incompatible(memory, 'No available memory slots')
  }
}
