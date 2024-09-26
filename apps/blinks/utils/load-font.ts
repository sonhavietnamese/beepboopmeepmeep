import { Font, FONT_MAP, fontCache } from '@/constants'

export const loadFont = async (fontName: Font) => {
  const cachedFont = fontCache.get(fontName)
  if (cachedFont) return cachedFont

  const url = FONT_MAP[fontName]

  const font = await fetch(url).then((response) => response.arrayBuffer())
  fontCache.set(fontName, font)
  return font
}
