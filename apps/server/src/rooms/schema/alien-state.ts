import { Schema, type } from '@colyseus/schema'

export enum AlienClass {
  WARRIOR = 'WARRIOR',
  ADC = 'ADC',
  SUPPORT = 'SUPPORT',
}

export enum AlienAnimation {
  IDLE = 'IDLE',
  RUN = 'RUN',
  ATTACK = 'ATTACK',
  DEATH = 'DEATH',
}

export class Vector3 extends Schema {
  @type('number') x: number = 0
  @type('number') y: number = 0
  @type('number') z: number = 0

  constructor(x = 0, y = 0, z = 0) {
    super()
    this.x = x
    this.y = y
    this.z = z
  }
}

export class AlienState extends Schema {
  @type('string') class: AlienClass = AlienClass.WARRIOR
  @type(Vector3) position = new Vector3()
  @type(Vector3) rotation = new Vector3()
  @type('string') animation: AlienAnimation = AlienAnimation.IDLE
}
