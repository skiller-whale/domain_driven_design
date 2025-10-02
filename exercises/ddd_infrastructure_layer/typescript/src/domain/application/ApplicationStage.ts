class ApplicationStageThree {
  static readonly name = "Stage Three";

  static isValidForStage(applicationFields: Record<string, any>): boolean {
    return ApplicationStageTwo.isValidForStage(applicationFields);
  }
}

class ApplicationStageTwo {
  static readonly name = "Stage Two";

  static isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      ApplicationStageOne.isValidForStage(applicationFields) &&
      applicationFields.motivationLetter);
  }
}

class ApplicationStageOne {
  static readonly name = "Stage One";

  static isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      ApplicationStageZero.isValidForStage(applicationFields) &&
      applicationFields.fullName &&
      applicationFields.emailAddress &&
      applicationFields.phoneNumber);
  }
}

class ApplicationStageZero {
  static readonly name = "Stage Zero";

  static isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      applicationFields.id &&
      applicationFields.receivedDateTime);
  }
}

export interface ApplicationStage {
  readonly name: string;
  isValidForStage(applicationFields: Record<string, any>): boolean;
}

export class ApplicationStage {
  static Zero: ApplicationStage = ApplicationStageZero;
  static One: ApplicationStage = ApplicationStageOne;
  static Two: ApplicationStage = ApplicationStageTwo;
  static Three: ApplicationStage = ApplicationStageThree;
}
