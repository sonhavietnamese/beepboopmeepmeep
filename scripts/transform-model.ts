import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

const modelsDir = path.join('assets/models-raw')
const outputDir = path.join('assets/models-transforms')

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.readdir(modelsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith('.glb')) {
      const inputFilePath = path.join(modelsDir, file)
      const outputFilePath = path.join(outputDir, `${file.replace('.glb', '')}-transform.glb`)

      const command = `gltf-transform optimize ${inputFilePath} ${outputFilePath} --compress draco --texture-compress ktx2`

      exec(command, (execErr, stdout, stderr) => {
        if (execErr) {
          console.error(`Error optimizing ${file}:`, execErr)
          return
        }
        console.log(`Successfully optimized ${file} to ${outputFilePath}`)
        if (stdout) console.log(stdout)
        if (stderr) console.error(stderr)
      })
    }
  })
})
