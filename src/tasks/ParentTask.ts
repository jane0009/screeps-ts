import { ExtendedCreep } from "extends";
import { Subtask } from "./Subtask";
import { Task } from "./Task";


export abstract class ParentTask extends Task {
    protected subtasks: Subtask[] = [];

    constructor(name: string, priority: number, parts: BodyPartConstant[], room: Room) {
        super(name, priority, parts, room);
        if (this.subtasks.length > 0) {
            if (Array.isArray(this.assignedCreeps)) {
                this.assignedCreeps = {};
            }
            for (let subtask of this.subtasks) {
                this.assignedCreeps[subtask.name] = [];
            }
        }
    }

    public runTask(): void {
        if (this.subtasks.length > 0) {
            this.subtasks.sort(
                (a, b) => {
                    return a.priority - b.priority;
                }
            );
            for (let task of this.subtasks) {
                task.runTask();
            }
        }
    }

    public shouldSpawn(): Boolean {
        if (this.manager == undefined || this.numAssignedCreeps >= this.creepsRequired) {
            return false;
        }
        let unassignedCreeps = this.manager.getUnassignedCreeps(this.bodyPartRequirements);
        if (unassignedCreeps.size() > 0) {
            let creep: ExtendedCreep = unassignedCreeps.get(0);
            if (this instanceof Subtask) {
                creep.memory.subtask = this.name;
            }
            else {
                creep.memory.task = this.name;
            }
            return false;
        }
        else {
            return true;
        }
    };
}
