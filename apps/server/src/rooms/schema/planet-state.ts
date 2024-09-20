import { MapSchema, Schema, type } from '@colyseus/schema'
import { AlienState } from './alien-state'

export class PlanetState extends Schema {
  @type({ map: AlienState }) aliens = new MapSchema<AlienState>()
}
