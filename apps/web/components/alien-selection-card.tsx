import { useSpritesheet } from '@/stores/spritesheet'
import { useApp } from '@pixi/react'
import { Container, Sprite, Texture, TilingSprite } from 'pixi.js'
import { useEffect } from 'react'

export default function AlienSelectionCard() {
  const spritesheet = useSpritesheet((state) => state.spritesheet)
  const app = useApp()

  if (!spritesheet) return null

  useEffect(() => {
    const container = new Container()
    container.scale.set(1)
    app.stage.addChild(container)

    const mask = new Sprite(Texture.from('alien-selection-card'))
    container.mask = mask

    const sprite = new Sprite(Texture.from('alien-selection-card'))
    container.addChild(sprite)
    sprite.position.set(0, 0)

    container.addChild(mask)

    const tilingSprite = new TilingSprite(Texture.from('tile-01'))
    tilingSprite.visible = false
    tilingSprite.scale.set(2)
    container.addChild(tilingSprite)
    tilingSprite.width = container.width
    tilingSprite.height = container.height
    tilingSprite.position.set(0, 0)

    container.interactive = true
    container.on('pointerover', () => {
      tilingSprite.visible = true
      sprite.visible = false
    })
    container.on('pointerout', () => {
      tilingSprite.visible = false
      sprite.visible = true
    })

    app.ticker.add(() => {
      tilingSprite.tilePosition.x += 1
    })

    return () => {
      app.stage.removeChild(container)
    }
  }, [app.stage])

  return null
}
