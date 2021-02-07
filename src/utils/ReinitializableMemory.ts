import commonjs from '@rollup/plugin-commonjs';
import * as lzstring from '../lib/lzstring';

/**
 * to be used for higher level variable storage,
 * in places where data must persist across ticks
 * and cannot be stored inside of a creep's memory
 */
export class ExtendedMemory {
  constructor() {
    if (Memory.storage != undefined) {
      this.reconstruct();
    }
  }

  private localMemory: any = {};

  public getData(key: string): any {
    return this.localMemory[key]
  }
  public setData(key: string, value: any): any {
    this.localMemory[key] = value;
    this.saveKey(key);
  }

  public static serializeData(data: string): string {
    return lzstring.compressToUTF16(data);
  }

  public static deserializeData(data: string): string | null {
    return lzstring.decompressFromUTF16(data);
  }

  private saveKey(key: string): void {
    if (Memory.storage == undefined) {
      Memory.storage = {}
    }
    if (this.localMemory[key] != undefined) {
      let data = ExtendedMemory.serializeData(
        JSON.stringify(this.localMemory[key])
      );
      if (data != Memory.storage[key]) {
        Memory.storage[key] = data;
      }
    }
  }

  private reconstruct(): void {
    for (let key in Memory.storage) {
      let deserialziedData = ExtendedMemory.deserializeData(Memory.storage[key]);
      if (deserialziedData != null) {
        this.localMemory[key] = JSON.parse(
          deserialziedData
        );
      }
    }
  }
}
