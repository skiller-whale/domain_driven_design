import { CompatibilityResult } from "./CompatibilityResult"
import type { MemoryStick } from "./MemoryStick"
import type { Motherboard } from "./Motherboard"

export class Build {
  motherboard: Motherboard | null = null
  memorySticks: MemoryStick[] = []

  addMotherboard(motherboard: Motherboard) {
    if (this.motherboard) {
      throw new Error('Motherboard already added')
    }
    this.motherboard = motherboard
  }

  addMemory(memory: MemoryStick) {
    this.memorySticks.push(memory)
  }

  validate(): CompatibilityResult[] {
    if (!this.motherboard) {
      throw new Error('No motherboard added')
    }

    // Go through each memory stick and build a report of incompatibilities
    const incompatibilityReport: CompatibilityResult[] = []
    for (const memoryStick of this.memorySticks) {

      // Try to attach the memory stick to the motherboard
      const result = this.motherboard.attachMemory(memoryStick)

      // If the result is incompatible, add it to the report
      if (result.isIncompatible()) {
        incompatibilityReport.push(result);
      }
    }

    // If there are no incompatibilities, the build is valid
    return incompatibilityReport;
  }
}
