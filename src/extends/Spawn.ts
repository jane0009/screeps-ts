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

    public tick(): void {
        if (this.isActive() && !this.spawning) {
            let accumulator: number = 1;
            if (global._memory != undefined) {
                let savedValue = global._memory.getData(this.room.name + ".spawn");
                if (savedValue != undefined) {
                    accumulator = parseInt(savedValue);
                }
                let next = this.nextSpawn;
                let result = this.spawnCreep(next.body, String(accumulator));
                if (result == 0) {
                    global._memory.setData(this.room.name + ".spawn", accumulator + 1);
                    this.spawnedNext();
                }
                else {
                    console.error("could not spawn new creep");
                }
            }
        }
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

    private spawnedNext(): void {
        this.spawnQueue = this.spawnQueue.slice(0, 1);
    }

    public isQueued(creep: CreepSpawn): Boolean {
        let match = this.spawnQueue.filter(
            (spawn) => {
                return spawn.taskName == creep.taskName;
            }
        )
        return match.length > 0;
    }

    public queueCreep(creep: CreepSpawn): void {
        this.spawnQueue.push(creep);
        this._sort();
    }

    public maximizeBody(parts: BodyPartConstant[]): BodyPartConstant[] {
        // creeps should always have a move part
        if (this.room.energyAvailable < BODYPART_COST[MOVE]) {
            return [];
        }
        let energyLeft = this.room.energyAvailable - BODYPART_COST[MOVE];
        let partList: BodyPartConstant[] = [MOVE];
        while (energyLeft > 0) {
            let failedPart = false;
            for (let part of parts) {
                let cost = BODYPART_COST[part];
                if (cost <= energyLeft) {
                    energyLeft -= cost;
                    partList.push(part);
                }
                else {
                    failedPart = true;
                }
            }
            if (failedPart) {
                break;
            }
        }
        return partList;
    }
}
