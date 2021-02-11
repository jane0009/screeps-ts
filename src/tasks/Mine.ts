import { ExtendedCreep } from 'extends';
import { Subtask } from './Subtask';
import { Task } from './Task'
import { ParentTask } from "./ParentTask";

export class TaskMine extends ParentTask {
    constructor(room: Room) {
        super("mining", 0, [WORK, CARRY, MOVE], room);
    }

    public shouldSpawn(): Boolean {
        return false;
    }

    protected subtasks: Subtask[] = [new SubtaskMine(this), new SubtaskCarry(this)];
}

class SubtaskMine extends Subtask {
    constructor(parent: Task) {
        super("mine", 0, parent);
        this.assignedCreeps = this.parent.getAssignedCreeps("mine");
    }

    protected subtaskFunction: Function = () => {

    };
}

class SubtaskCarry extends Subtask {
    constructor(parent: Task) {
        super("carry", 0, parent);
        this.assignedCreeps = this.parent.getAssignedCreeps("carry");
    }
    protected subtaskFunction: Function = () => {

    };
}
