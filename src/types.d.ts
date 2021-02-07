// example declaration file - remove these and add your own custom typings

interface CreepMemory {
  task: string | undefined;
  subtask: string | undefined;
  room: string;
  working: boolean;
  _move: string | undefined;
  _target: RoomPosition | undefined;
}

interface Memory {
  uuid: number;
  log: any;
  storage: any;
}

declare namespace NodeJS {
  interface Global {
    log: any;
    _memory: any;
  }
}
