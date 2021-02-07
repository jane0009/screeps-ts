import { ErrorMapper } from "utils/ErrorMapper";
import { ExtendedCreep } from "extends";
import { ExtendedRoom } from "extends/Room";
import { ExtendedMemory } from "utils/ReinitializableMemory";
import { TaskManager } from "tasks/TaskManager";
import * as Tasks from "tasks"
import { Task } from "tasks/Task";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code


global._memory = new ExtendedMemory();

let taskList: Task[] = [
  new Tasks.TaskMine,
  new Tasks.TaskMaintain,
  new Tasks.TaskUpgrade
];

let taskManager: TaskManager = new TaskManager(global._memory, taskList);
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  let extendedSimRoom = new ExtendedRoom("sim");
  console.log(`Energy count is: ${extendedSimRoom.getTotalEnergyCount()},`
    + ` capacity is: ${extendedSimRoom.getResourceCap(RESOURCE_ENERGY)}`)
  for (const name in Memory.creeps) {
    // Automatically delete memory of missing creeps
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  taskManager.run();
  // for (const name in Game.creeps) {
  //   let creep: ExtendedCreep = new ExtendedCreep(Game.creeps[name].id);
  //   let isMoving: number = creep.isMovingToDestination();
  //   if (isMoving == 0) {
  //     // execute task code
  //   }
  // }
});
