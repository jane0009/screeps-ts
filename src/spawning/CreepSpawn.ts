export class CreepSpawn {
  constructor(name: string, priority: number, body: BodyPartConstant[]) {
    this.taskName = name;
    this.priority = priority;
    this.body = body;
  }
  public readonly taskName: string;
  public readonly priority: number;
  public readonly body: BodyPartConstant[];
}
