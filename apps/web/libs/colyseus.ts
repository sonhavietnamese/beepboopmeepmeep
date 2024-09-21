// @ts-ignore
// @ts-nocheck

import { Schema } from '@colyseus/schema'
import { Client, ErrorCode, type Room } from 'colyseus.js'
import { useStore } from 'zustand'
import { createStore, StoreApi } from 'zustand/vanilla'
import { PlanetState } from '../../server/src/rooms/schema/planet-state'

interface StoreState {
  room: Room<PlanetState> | undefined
  state: PlanetState | undefined
  setRoom: (room: Room<PlanetState> | undefined) => void
  setState: (state: PlanetState | undefined) => void
}

export const store = createStore<StoreState>((set) => ({
  room: undefined,
  state: undefined,
  setRoom: (room: Room<PlanetState> | undefined) => set({ room }),
  setState: (state: PlanetState | undefined) => set({ state }),
}))

const { getState, setState, subscribe, getInitialState } = store

const createBoundedUseStore = ((store) => (selector) => useStore(store, selector)) as <S extends StoreApi<unknown>>(
  store: S,
) => {
  (): ExtractState<S>
  <T>(selector: (state: ExtractState<S>) => T): T
}

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

export const useNetworkStore = createBoundedUseStore(store)

type RoomOptions = {
  metadata: {
    id: string
  }
}

const colyseus = (endpoint: string, schema?: new (...args: unknown[]) => PlanetState) => {
  const client = new Client(endpoint)

  const roomStore = getState().room

  let connecting = false

  const connectToColyseus = async <T extends RoomOptions>(roomName: string, options: T) => {
    if (connecting || roomStore) return

    connecting = true

    try {
      let room: Room<PlanetState> | undefined

      try {
        room = await client.joinById<PlanetState>(options.metadata.id, options, schema)
      } catch (error: any) {
        if (error.code === ErrorCode.MATCHMAKE_INVALID_ROOM_ID) {
          room = await client.create<PlanetState>(roomName, options, schema)
        } else {
          throw error
        }
      }

      setState({ room, state: room.state })

      const updatedCollectionsMap: { [key in keyof PlanetState]?: boolean } = {}

      for (const [key, value] of Object.entries(room.state as Schema)) {
        if (typeof value !== 'object' || !value.clone || !value.onAdd || !value.onRemove) {
          continue
        }

        updatedCollectionsMap[key as keyof PlanetState] = false

        value.onAdd(() => {
          updatedCollectionsMap[key as keyof PlanetState] = true
        })

        value.onRemove(() => {
          updatedCollectionsMap[key as keyof PlanetState] = true
        })
      }

      room.onStateChange((state) => {
        if (!state) return
        const copy = { ...state } as PlanetState

        for (const [key, update] of Object.entries(updatedCollectionsMap)) {
          if (!update) continue

          updatedCollectionsMap[key as keyof PlanetState] = false

          const value = state[key as keyof PlanetState] as unknown

          if ((value as Schema).clone) {
            //@ts-ignore
            copy[key as keyof PlanetState] = value.clone()
          }
        }

        setState({ state: copy })
      })

      console.log(`Succesfully connected to Colyseus room ${roomName} at ${endpoint}`)
    } catch (e) {
      console.error('Failed to connect to Colyseus!')
      console.log(e)
    } finally {
      connecting = false
    }
  }

  const disconnectFromColyseus = async () => {
    const room = roomStore
    if (!room) return

    setState({ room: undefined, state: undefined })

    try {
      await room.leave()
      console.log('Disconnected from Colyseus!')
    } catch {}
  }

  return {
    client,
    connectToColyseus,
    disconnectFromColyseus,
  }
}

export const { client, connectToColyseus, disconnectFromColyseus } = colyseus('ws://localhost:2567')
