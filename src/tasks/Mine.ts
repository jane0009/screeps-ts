import { Task } from './Task'

export class TaskMine extends Task {
  public runTask(): void {
    throw new Error('Method not implemented.')
  }
  constructor() {
    super(0, [WORK, CARRY, MOVE])
  }
}
