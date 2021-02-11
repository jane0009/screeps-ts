import { ExtendedCreep } from "extends";
import { TaskManager } from "./TaskManager";

export abstract class Task {
    constructor(name: string, priority: number, parts: BodyPartConstant[], room: Room) {
        this.name = name;
        this.priority = priority;
        this.bodyPartRequirements = parts;
        this.room = room;
    }

    private taskManager: TaskManager | undefined = undefined;

    get manager(): TaskManager | undefined {
        return this.taskManager;
    }
    set manager(newManager: TaskManager | undefined) {
        this.taskManager = newManager;
    }

    readonly name: string;
    readonly priority: number;
    readonly bodyPartRequirements: BodyPartConstant[];
    public readonly room: Room;

    protected creepsRequired: number = 1;

    /**
     * if there are no subtasks, then there's no point in assigning creeps to
     * each
     */
    protected assignedCreeps: ExtendedCreep[] | { [subtask: string]: ExtendedCreep[] } = []

    get numAssignedCreeps(): number {
        if (Array.isArray(this.assignedCreeps)) {
            return this.assignedCreeps.length;
        }
        else {
            let total: number = 0;
            for (let key in this.assignedCreeps) {
                total += this.assignedCreeps[key].length;
            }
            return total;
        }
    }

    public getAssignedCreeps(subtask: string | undefined) {
        if (subtask == undefined && Array.isArray(this.assignedCreeps)) {
            return this.assignedCreeps;
        } else if (typeof subtask == 'string' && !Array.isArray(this.assignedCreeps)) {
            return this.assignedCreeps[subtask];
        } else {
            return [];
        }
    }

    public abstract shouldSpawn(): Boolean;

    // default runTask, for when there are only subtasks present
    public abstract runTask(): void;
}

export class SleepingTask {
    constructor(task: Task, cooldown: number) {
        this.affectedTask = task;
        this.cooldown = cooldown;
    }

    public readonly affectedTask: Task;
    public cooldown: number;
}
