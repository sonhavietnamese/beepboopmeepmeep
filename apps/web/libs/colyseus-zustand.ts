import { Schema } from '@colyseus/schema'
import { Client, type Room } from 'colyseus.js'
import { useSyncExternalStore } from 'react'
import { createStore } from 'zustand/vanilla' // Add Zustand import
import { PlanetState } from '../../server/src/rooms/schema/planet-state'
import { useStore } from 'zustand'

// Replace custom store with Zustand store
interface Store {
  room: Room<Schema> | undefined
  state: Schema | undefined
  setRoom: (room: Room<Schema>) => void
  setState: (state: Schema) => void
}

export const store = createStore<Store>((set) => ({
  room: undefined as Room<Schema> | undefined,
  state: undefined as Schema | undefined,
  setRoom: (room: Room<Schema>) => set({ room }),
  setState: (state: Schema) => set({ state }),
}))

const { getState, setState, subscribe, getInitialState } = store

export const useBoundStore = (selector) => useStore(store, selector)

const colyseus = <S = Schema>(endpoint: string, schema?: new (...args: unknown[]) => S) => {
  const client = new Client(endpoint)

  // Use Zustand store
  const roomStore = getState().room
  const stateStore = getState().state

  let connecting = false

  const connectToColyseus = async (roomName: string, options = {}) => {
    if (connecting || roomStore) return

    connecting = true

    try {
      let room: Room<S> | undefined

      try {
        room = await client.join<S>(roomName, options, schema)
      } catch (error) {
        room = await client.joinOrCreate<S>(roomName, options, schema)
      }

      setState({ room, state: room.state })

      const updatedCollectionsMap: { [key in keyof S]?: boolean } = {}

      for (const [key, value] of Object.entries(room.state as Schema)) {
        if (typeof value !== 'object' || !value.clone || !value.onAdd || !value.onRemove) {
          continue
        }

        updatedCollectionsMap[key as keyof S] = false

        value.onAdd(() => {
          updatedCollectionsMap[key as keyof S] = true
        })

        value.onRemove(() => {
          updatedCollectionsMap[key as keyof S] = true
        })
      }

      room.onStateChange((state) => {
        if (!state) return
        const copy = { ...state }

        for (const [key, update] of Object.entries(updatedCollectionsMap)) {
          if (!update) continue

          updatedCollectionsMap[key as keyof S] = false

          const value = state[key as keyof S] as unknown

          if ((value as Schema).clone) {
            //@ts-ignore
            copy[key as keyof S] = value.clone()
          }
        }

        setState({ state: copy }) // Update stateStore
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

  const useColyseusRoom = () => {
    const subscribe = (callback: () => void) => store.subscribe(() => callback())
    const getSnapshot = () => roomStore
    return useSyncExternalStore(subscribe, getSnapshot)
  }

  const useColyseusState = <T extends (state: S) => unknown>(selector?: T) => {
    const subscribe = (callback: () => void) => store.subscribe(() => callback())
    const getSnapshot = () => {
      const state = stateStore
      return state && selector ? selector(state) : state
    }
    return useSyncExternalStore(subscribe, getSnapshot)
  }

  return {
    client,
    connectToColyseus,
    disconnectFromColyseus,
    useColyseusRoom,
    useColyseusState,
  }
}

export const { client, connectToColyseus, disconnectFromColyseus, useColyseusRoom, useColyseusState } = colyseus<PlanetState>('ws://localhost:2567')
