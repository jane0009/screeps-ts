import { ExtendedCreep } from 'extends';
import { Subtask } from './Subtask';
import { ParentTask } from "./ParentTask";

export class TaskUpgrade extends ParentTask {
    constructor(room: Room) {
        super("upgrading", 9, [WORK, CARRY, MOVE], room);
    }
    protected subtasks: Subtask[] = [];
}
