export class CreepSpawn {
  constructor(priority: number, body: BodyPartDefinition) {
    this.priority = priority;
    this.body = body;
  }
  public readonly priority: number;
  public readonly body: BodyPartDefinition;
}
