export class ExtendedCreep extends Creep {
  constructor(creep: Id<Creep> | Creep) {
    if (creep instanceof Creep) {
      super(creep.id)
    }
    else {
      super(creep)
    }
  }

  public setDestination(pos: RoomPosition): void {
    if (this.pos.isEqualTo(pos)) {
      return;
    }
    let path: PathStep[] = this.pos.findPathTo(pos);
    this.memory['_move'] = Room.serializePath(path);
    this.memory['_target'] = pos;
  }

  public clearDestination(): Boolean {
    if (this.memory['_move'] !== undefined) {
      this.memory['_move'] = undefined;
      this.memory['_target'] = undefined;
      return true;
    }
    return false;
  }

  public isMovingToDestination(): number {
    if (this.memory['_move'] !== undefined
      && this.memory['_target'] !== undefined) {
      if (this.pos.isEqualTo(this.memory['_target'])) {
        // if the dest can be cleared, return 0 (not moving)
        return this.clearDestination() ? 0 : 1;
      }
      let result: number = this.moveByPath(this.memory['_move']);
      return result == 0 ? 1 : result;
    }
    return 0;
  }
}
