import { Command } from '@colyseus/command'
import { Planet } from '@/rooms/planet'
import { AlienRole } from '@repo/shared'

export class OnSwitchRoleCommand extends Command<
  Planet,
  {
    sessionId: string
    role: AlienRole
  }
> {
  execute({ sessionId, role }: { sessionId: string; role: AlienRole }) {
    this.room.state.changeRole(sessionId, role)
  }
}
