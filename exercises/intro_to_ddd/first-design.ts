
class Build {
  constructor(
    public componentSelection: ComponentSelection[] = []
  ) { }
}

class ComponentSelection {
  constructor(
    public component: Component
  ) { }
}

class Component {
  constructor(
    public name: string,
    public supports: Standard[] = [],
    public requires: Standard[] = []
  ) { }
}

class Standard {
  constructor(
    public name: string
  ) { }
}

class BuildVerifier {
  invalidComponents(build: Build): Component[] {
    const supported = this.supportedStandards(build);
    const required = this.requiredStandards(build);
    const missing = required.difference(supported);
    return this.componentsRequiringStandards(build, missing);
  }

  private supportedStandards(build: Build): Set<string> {
    return new Set(build.componentSelection
      .map(selection => selection.component)
      .flatMap(component => component.supports)
      .flatMap(std => std.name));
  }

  private requiredStandards(build: Build): Set<string> {
    return new Set(build.componentSelection
      .map(selection => selection.component)
      .flatMap(component => component.requires)
      .flatMap(std => std.name));
  }

  private componentsRequiringStandards(build: Build, standards: Set<string>): Component[] {
    return build.componentSelection
      .map(selection => selection.component)
      .filter(component => component.requires
        .some(std => standards.has(std.name)));
  }
}

let build = new Build([
  new ComponentSelection(new Component('Motherboard',
    [new Standard('DDR5'), new Standard('PCIe 4.0')], [])),
  new ComponentSelection(new Component('RAM',
    [], [new Standard('DDR4')])),
  new ComponentSelection(new Component('Sound Card',
    [], [new Standard('PCIe 4.0')])),
]);

let verifier = new BuildVerifier();
let invalidComponents = verifier.invalidComponents(build);

if (invalidComponents.length === 0) {
  console.log('Build is valid');
} else {
  console.log('Build is invalid');
  for (const component of invalidComponents) {
    console.log(` - ${component.name}`);
  }
}
