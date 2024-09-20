import { Room, Client } from '@colyseus/core'
import { PlanetState } from './schema/planet-state'
import { Dispatcher } from '@colyseus/command'
import { OnJoinCommand } from '../commands/on-join-command'
import { OnLeaveCommand } from '../commands/on-leave-command'

type RoomCreateOptions = {
  metadata: {
    id: string
  }
}

export class Planet extends Room<PlanetState> {
  maxClients = 3
  dispatcher = new Dispatcher(this)

  onCreate(options: RoomCreateOptions) {
    this.setState(new PlanetState())

    this.roomId = options.metadata.id

    this.onMessage('type', (client, message) => {})
  }

  onJoin(client: Client, options: any) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId,
    })
  }

  onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      sessionId: client.sessionId,
    })
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...')
    this.dispatcher.stop()
  }
}
