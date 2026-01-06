export interface ApplicationStage {
  readonly name: string;
  isValidForStage(applicationFields: Record<string, any>): boolean;
}

const ApplicationStageZero: ApplicationStage = {
  name: "Stage Zero",

  isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      applicationFields.id &&
      applicationFields.receivedDateTime);
  }
}

const ApplicationStageOne: ApplicationStage = {
  name: "Stage One",

  isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      ApplicationStageZero.isValidForStage(applicationFields) &&
      applicationFields.fullName &&
      applicationFields.emailAddress &&
      applicationFields.phoneNumber);
  }
}

const ApplicationStageTwo: ApplicationStage = {
  name: "Stage Two",

  isValidForStage(applicationFields: Record<string, any>): boolean {
    return !!(
      ApplicationStageOne.isValidForStage(applicationFields) &&
      applicationFields.motivationLetter);
  }
}

const ApplicationStageThree: ApplicationStage = {
  name: "Stage Three",

  isValidForStage(applicationFields: Record<string, any>): boolean {
    return ApplicationStageTwo.isValidForStage(applicationFields);
  }
}

export const ApplicationStage = {
  Zero: ApplicationStageZero,
  One: ApplicationStageOne,
  Two: ApplicationStageTwo,
  Three: ApplicationStageThree,
}

export const ApplicationStages: ApplicationStage[] = [
  ApplicationStage.Zero,
  ApplicationStage.One,
  ApplicationStage.Two,
  ApplicationStage.Three,
];
