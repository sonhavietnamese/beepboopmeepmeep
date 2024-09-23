import { useApp } from '@pixi/react'
import { useEffect } from 'react'

export default function Cursor() {
  const defaultIcon = "url('/sprites/cursor-default.png'), auto"
  const app = useApp()

  useEffect(() => {
    app.renderer.plugins.interaction.cursorStyles.default = defaultIcon
  }, [app, defaultIcon])

  return null
}
