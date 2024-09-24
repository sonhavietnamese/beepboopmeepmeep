import { useSpritesheet } from '@/stores/spritesheet'
import { useApp } from '@pixi/react'
import { Container, Sprite, Text, Texture, TilingSprite } from 'pixi.js'
import { useEffect } from 'react'

export default function AlienSelectionCard() {
  const spritesheet = useSpritesheet((state) => state.spritesheet)
  const app = useApp()

  if (!spritesheet) return null

  useEffect(() => {
    const group = new Container()

    group.width = app.screen.width
    group.pivot.set(0.5)

    group.position.set(app.screen.width / 2, app.screen.height / 2)

    const cards: Container[] = [new Container(), new Container(), new Container()]

    if (!cards[0]) return
    if (!cards[1]) return
    if (!cards[2]) return

    cards.forEach((card, i) => {
      card.scale.set(0.5)
      const mask = new Sprite(Texture.from('alien-selection-card'))
      card.mask = mask

      const sprite = new Sprite(Texture.from('alien-selection-card'))
      card.addChild(sprite)
      sprite.position.set(0, 0)

      card.addChild(mask)

      const tilingSprite = new TilingSprite(Texture.from('tile-01'))
      tilingSprite.visible = false
      tilingSprite.scale.set(2)
      card.addChild(tilingSprite)
      tilingSprite.width = card.width
      tilingSprite.height = card.height
      tilingSprite.position.set(0, 0)

      const frame = new Sprite(Texture.from('alien-avatar-placeholder'))
      card.addChild(frame)
      frame.position.set(52, 36)

      const alien = new Text('Alien', {
        fontFamily: 'Seurat',
        fontSize: 24,
        fill: 0xffffff,
      })
      card.addChild(alien)
      alien.position.set(52, 36)

      card.interactive = true
      card.on('pointerover', () => {
        tilingSprite.visible = true
        sprite.visible = false
      })
      card.on('pointerout', () => {
        tilingSprite.visible = false
        sprite.visible = true
      })

      card.position.set(10 + card.width * i, 10)

      group.addChild(card)
    })

    app.stage.addChild(group)

    return () => {
      app.stage.removeChild(group)
    }
  }, [app.stage])

  return null
}
