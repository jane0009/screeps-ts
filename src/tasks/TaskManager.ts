import { ExtendedMemory } from "utils/ReinitializableMemory";
import { Task } from "./Task";

export class TaskManager {
  constructor(memory: ExtendedMemory, taskList: Task[]) {
    this.memoryInstance = memory;
    this.activeTasks = taskList;
    this.sleepingTasks = [];
  }

  private memoryInstance: ExtendedMemory;
  private activeTasks: Task[];
  private sleepingTasks: Task[];

  private getUnassignedCreeps(requiredParts: BodyPartConstant[]) {
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
      .collect();
  }
  public run() {

  }
}
