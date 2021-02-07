import { CreepSpawn } from "definition/CreepSpawn";

export class ExtendedSpawn extends StructureSpawn {
  constructor(spawn: Id<StructureSpawn> | StructureSpawn) {
    if (spawn instanceof StructureSpawn) {
      super(spawn.id)
    }
    else {
      super(spawn)
    }

    this.spawnQueue = [];
  }

  private spawnQueue: CreepSpawn[];

  private _sort(): void {
    this.spawnQueue = this.spawnQueue.sort(
      (a, b) => {
        return a.priority - b.priority
      }
    )
  }

  get nextSpawn(): CreepSpawn {
    return this.spawnQueue[0];
  }

  public queueCreep(creep: CreepSpawn): void {
    this.spawnQueue.push(creep);
    this._sort();
  }
}
