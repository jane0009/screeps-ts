import { Task } from './Task'

export class TaskUpgrade extends Task {
  public runTask(): void {
    throw new Error('Method not implemented.')
  }
  constructor() {
    super(9, [WORK, CARRY, MOVE])
  }
}
