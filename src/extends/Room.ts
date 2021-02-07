export class ExtendedRoom extends Room {
  constructor(room: Room | string) {
    if (room instanceof Room) {
      super(room.name)
    }
    else {
      super(room)
    }
  }

  public getTotalResourceCount(resource: ResourceConstant): number {
    let total: number = 0;
    let structures = this.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure as AnyStoreStructure).store !== undefined;
      }
    })

    for (let structure of structures) {
      total += (structure as AnyStoreStructure).store[resource];
    }
    return total;
  }

  public getResourceCap(resource: ResourceConstant): number {
    let total: number = 0;
    let structures = this.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure as AnyStoreStructure).store !== undefined;
      }
    })

    for (let structure of structures) {
      let capacity: number | null = ((structure as AnyStoreStructure).store as GenericStore).getCapacity(resource);
      if (capacity !== null) {
        total += capacity;
      }
    }
    return total;
  }

  public getTotalEnergyCount(): number {
    return this.getTotalResourceCount(RESOURCE_ENERGY);
  }

  public getEnergyCap(): number {
    return this.getResourceCap(RESOURCE_ENERGY);
  }
}
