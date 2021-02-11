import { ExtendedCreep } from "extends";
import { Task } from "./Task";

/**
 * a regular task, but the runTask function is a parameter instead of constant
 */
export abstract class Subtask extends Task {
    constructor(name: string, priority: number, parent: Task) {
        super(parent.name + "." + name, priority, parent.bodyPartRequirements, parent.room);
        this.parent = parent;
    }

    protected parent: Task;
    protected abstract subtaskFunction: Function;
    public runTask() {
        this.subtaskFunction();
    }
    public shouldSpawn() {
        return false;
    }
}
