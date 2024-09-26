import { readFile, writeFile } from 'node:fs/promises'

async function initFonts() {
  const fontData = await readFile('apps/blinks/assets/Roboto-Regular.ttf')
  await writeFile('font.json', JSON.stringify({ fontData: fontData.toString('base64') }))
}

initFonts().then(() => {
  console.log('Font data saved to font.json')
})
