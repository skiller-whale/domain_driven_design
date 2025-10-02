export class Standard {
  name: string

  constructor(name: string) {
    this.name = name
  }

  isCompatibleWith(other: Standard): boolean {
    return this.name === other.name
  }
}
