import { Client, Room, ErrorCode } from 'colyseus.js'
import { create } from 'zustand'
import { PlanetState } from '../../server/src/rooms/schema/planet-state'
import { AlienState } from '../../server/src/rooms/schema/alien-state'

interface RoomState {
  client: Client
  room: Room<PlanetState> | null
  joinRoom: (id: string) => Promise<Room<PlanetState>>
  exitRoom: () => void
  error: any | null
  aliens: Map<string, AlienState>
  addAlien: (id: string, alien: AlienState) => void
  removeAlien: (id: string) => void
}

export const useNetworkStore = create<RoomState>((set, get) => ({
  client: new Client('ws://localhost:2567'),
  joinRoom: async (id: string) => {
    console.log('joinRoom', id)
    const client = get().client

    try {
      const room = await client.joinById<PlanetState>(id)

      set({ room })
      return room
    } catch (error: any) {
      if (error.code === ErrorCode.MATCHMAKE_INVALID_ROOM_ID) {
        const room = await client.joinOrCreate<PlanetState>('planet', {
          metadata: {
            id,
          },
        })

        set({ room })
        return room
      }
    }
  },
  room: null,
  exitRoom: () => {},
  error: null,
  aliens: new Map(),
  addAlien: (id: string, alien: AlienState) => set((state) => ({ aliens: state.aliens.set(id, alien) })),
  removeAlien: (id: string) =>
    set((state) => {
      const aliens = state.aliens

      aliens.delete(id)

      console.log('aliens', aliens)
      return { aliens }
    }),
}))
