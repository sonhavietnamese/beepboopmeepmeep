import { Command } from '@colyseus/command'
import { Planet } from '@/rooms/planet'

export class OnRoomCreateCommand extends Command<
  Planet,
  {
    metadata: {
      id: string
    }
  }
> {
  execute({ metadata }: { metadata: { id: string } }) {
    this.room.setMetadata({
      id: metadata.id,
    })
  }
}
