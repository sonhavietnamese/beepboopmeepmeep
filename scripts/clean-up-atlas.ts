import * as fs from 'fs'

const atlasPath = 'apps/web/assets/atlas.json'
const newAtlasPath = 'apps/web/assets/atlas-clean.json' // New file name

// Read the atlas JSON file
fs.readFile(atlasPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)
    return
  }

  // Parse the JSON data
  const atlas = JSON.parse(data)

  // Remove the extension from each frame
  const updatedFrames: Record<string, any> = {}
  for (const frame in atlas.frames) {
    const frameNameWithoutExtension = frame.split('.')[0] // Remove extension
    updatedFrames[frameNameWithoutExtension] = atlas.frames[frame]
  }

  // Update the atlas object with the new frames
  atlas.frames = updatedFrames

  // Write the updated atlas to the new file
  fs.writeFile(newAtlasPath, JSON.stringify(atlas, null, 2), (err) => {
    if (err) {
      console.error('Error writing the file:', err)
    } else {
      console.log('Atlas updated successfully to atlas-clean.json!')
    }
  })
})
