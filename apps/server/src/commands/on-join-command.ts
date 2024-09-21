import { Command } from '@colyseus/command'
import { Planet } from '@/rooms/planet'
import { AlienState } from '@/rooms/schema/alien-state'

export class OnJoinCommand extends Command<
  Planet,
  {
    sessionId: string
  }
> {
  execute({ sessionId }: { sessionId: string }) {
    const alien = new AlienState(sessionId)
    this.state.aliens.set(sessionId, alien)

    // is the first player to join
    if (this.state.aliens.size === 1) {
      this.state.setHost(sessionId)
    }
  }
}
