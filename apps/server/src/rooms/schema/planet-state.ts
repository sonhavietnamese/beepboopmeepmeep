import { MapSchema, Schema, type } from '@colyseus/schema'
import { AlienState } from './alien-state'
import { AlienRole } from '@repo/shared'

export class PlanetState extends Schema {
  @type({ map: AlienState }) aliens = new MapSchema<AlienState>()
  @type('boolean') gameStarted: boolean = false

  startGame() {
    this.gameStarted = true
  }

  changeRole(sessionId: string, role: AlienRole) {
    this.aliens.get(sessionId).role = role
  }

  setHost(sessionId: string) {
    this.aliens.get(sessionId).isHost = true
  }
}
