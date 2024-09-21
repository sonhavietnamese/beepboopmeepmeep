import { Command } from '@colyseus/command'
import { Planet } from '../rooms/planet'

export class OnLeaveCommand extends Command<
  Planet,
  {
    sessionId: string
  }
> {
  execute({ sessionId }: { sessionId: string }) {
    const alien = this.state.aliens.get(sessionId)
    if (alien?.isHost && this.state.aliens.size > 1) {
      // Find another alien to become the host
      const otherAliens = Array.from(this.state.aliens.values()).filter((a) => a.sessionId !== sessionId)
      if (otherAliens.length > 0) {
        const newHost = otherAliens[0]
        newHost.isHost = true
      }
    }

    this.state.aliens.delete(sessionId)
  }
}
