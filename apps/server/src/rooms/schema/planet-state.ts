import { MapSchema, Schema, type } from '@colyseus/schema'
import { AlienState } from './alien-state'
import { AlienRole } from '@repo/shared'

export class PlanetState extends Schema {
  @type({ map: AlienState }) aliens = new MapSchema<AlienState>()

  changeRole(sessionId: string, role: AlienRole) {
    this.aliens.get(sessionId).role = role
    console.log('changeRole', sessionId, role)
  }
}
