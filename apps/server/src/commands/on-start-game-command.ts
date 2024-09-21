import { Command } from '@colyseus/command'
import { Planet } from '@/rooms/planet'

export class OnStartGameCommand extends Command<Planet> {
  execute() {
    this.state.startGame()
  }
}
