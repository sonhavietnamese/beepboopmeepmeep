import { Command } from '@colyseus/command'
import { Planet } from '../rooms/planet'

export class OnLeaveCommand extends Command<
  Planet,
  {
    sessionId: string
  }
> {
  execute({ sessionId }: { sessionId: string }) {
    this.state.aliens.delete(sessionId)
  }
}
