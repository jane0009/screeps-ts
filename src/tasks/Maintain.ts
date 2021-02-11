import { ExtendedCreep } from "extends";
import { Subtask } from "./Subtask";
import { ParentTask } from "./ParentTask";

export class TaskMaintain extends ParentTask {
    constructor(room: Room) {
        super("maintaining", 1, [WORK, CARRY, MOVE], room);
    }
    protected subtasks: Subtask[] = [];
}
