import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const imagesDir = path.join('apps/blinks/public')

async function compressAndResizeImages(dir) {
  fs.readdir(dir, { withFileTypes: true }, async (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err)
      return
    }

    for (const file of files) {
      const filePath = path.join(dir, file.name)

      if (file.isDirectory()) {
        await compressAndResizeImages(filePath) // Recursively process nested directories
      } else if (file.name.endsWith('.png')) {
        const outputFilePath = path.join(dir, `compressed-${file.name}`)
        try {
          await sharp(filePath).resize(512).toFile(outputFilePath)
          console.log(`Compressed and resized: ${filePath} to ${outputFilePath}`)
        } catch (error) {
          console.error(`Error processing file ${filePath}:`, error)
        }
      }
    }
  })
}

compressAndResizeImages(imagesDir)
