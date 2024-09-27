import fs from 'fs'
import path from 'path'

const texturesDir = path.join('apps/blinks/public/boss')

function cleanUpTextures(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name)

      if (file.isDirectory()) {
        cleanUpTextures(filePath) // Recursively clean up nested directories
      } else {
        if (file.name.endsWith('.meta')) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${filePath}:`, err)
            } else {
              console.log(`Deleted: ${filePath}`)
            }
          })
        } else {
          const newFileName = file.name.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')
          const newFilePath = path.join(dir, newFileName)

          if (newFilePath !== filePath) {
            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.error(`Error renaming file ${filePath} to ${newFilePath}:`, err)
              } else {
                console.log(`Renamed: ${filePath} to ${newFilePath}`)
              }
            })
          }
        }
      }
    })
  })
}

cleanUpTextures(texturesDir)
