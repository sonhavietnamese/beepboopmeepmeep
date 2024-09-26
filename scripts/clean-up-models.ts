import fs from 'fs'
import path from 'path'

const modelsDir = path.join('assets/models-raw')

fs.readdir(modelsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith('.glb')) {
      const newFileName = file.toLowerCase().replace(/_/g, '-').replace(/ /g, '-')

      const oldFilePath = path.join(modelsDir, file)
      const newFilePath = path.join(modelsDir, newFileName)

      fs.rename(oldFilePath, newFilePath, (renameErr) => {
        if (renameErr) {
          console.error(`Error renaming file ${file}:`, renameErr)
        } else {
          console.log(`Renamed ${file} to ${newFileName}`)
        }
      })
    }
  })
})
