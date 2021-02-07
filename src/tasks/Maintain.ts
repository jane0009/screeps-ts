import { Task } from "./Task";

export class TaskMaintain extends Task {
  public runTask(): void {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super(1, [WORK, CARRY, MOVE])
  }
}
