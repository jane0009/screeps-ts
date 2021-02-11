import { ExtendedCreep } from "extends";
import { ExtendedMemory } from "utils/ReinitializableMemory";
import { SleepingTask, Task } from "./Task";

export class TaskManager {
    constructor(memory: ExtendedMemory, taskList: Task[]) {
        this.memoryInstance = memory;
        this.activeTasks = taskList;
        this.activeTasks.forEach(
            (task) => {
                task.manager = this;
            }
        )
        this.sleepingTasks = [];
    }

    private memoryInstance: ExtendedMemory;
    private activeTasks: Task[];
    private sleepingTasks: SleepingTask[];

    public sleep(task: Task, time: number): Boolean {
        let index = this.activeTasks.indexOf(task);
        if (index != -1) {
            this.activeTasks = this.activeTasks.splice(index, 1);
            this.sleepingTasks.push(new SleepingTask(task, time));
            return true;
        }
        else {
            return false;
        }
    }

    public wake(sleepingTask: SleepingTask): Boolean {
        let index = this.sleepingTasks.indexOf(sleepingTask);
        if (index != -1) {
            this.sleepingTasks = this.sleepingTasks.splice(index, 1);
            this.activeTasks.push(sleepingTask.affectedTask);
            return true;
        }
        else {
            return false;
        }
    }

    public getUnassignedCreeps(requiredParts: BodyPartConstant[]) {
        let unassignedCreeps = _(Game.creeps).filter(
            (creep: Creep) => {
                return !creep.memory || creep.memory.task == undefined;
            }
        );
        let capableCreeps = unassignedCreeps.filter(
            (creep: Creep) => {
                let capable: Boolean = true;
                for (let part of requiredParts) {
                    let matches = creep.body.filter(
                        (bodyPart: BodyPartDefinition) => {
                            return bodyPart.type == part;
                        }
                    )

                    if (matches.length <= 0) {
                        capable = false;
                        break;
                    }
                }
                return capable;
            }
        );
        return capableCreeps
            // the -1 is so that the creeps with the *most* body parts get assigned first
            // i.e. the most capable creeps are always working
            .sortBy((creep: Creep) => { return creep.body.length * -1 })
            .map((creep: Creep) => { return new ExtendedCreep(creep) })
            .collect();
    }
    public run() {
        for (let task of this.activeTasks) {
            if (task.shouldSpawn()) {
                console.log("should spawn");
            }
            task.runTask();
        }
        for (let sleepingTask of this.sleepingTasks) {
            sleepingTask.cooldown -= 1;
            if (sleepingTask.cooldown <= 0) {
                //TODO report on error
                this.wake(sleepingTask);
            }
        }
    }
}
