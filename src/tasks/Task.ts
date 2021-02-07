export abstract class Task {
  constructor(priority: number, parts: BodyPartConstant[]) {
    this.priority = priority;
    this.bodyPartRequirements = parts;
  }

  readonly priority: number;
  readonly bodyPartRequirements: BodyPartConstant[];

  public abstract runTask(): void;
}
