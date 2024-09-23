import { useApp } from '@pixi/react'
import { useEffect } from 'react'

export default function HudResizer() {
  const app = useApp()

  useEffect(() => {
    const handleResize = () => {
      app.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [app])

  return null
}
