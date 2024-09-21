import { Schema, type } from '@colyseus/schema'
import { AlienRole, AlienAnimation } from '@repo/shared'

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
  @type('string') role: AlienRole = AlienRole.WARRIOR
  @type(Vector3) position = new Vector3()
  @type(Vector3) rotation = new Vector3()
  @type('string') animation: AlienAnimation = AlienAnimation.IDLE
}
