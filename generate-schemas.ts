import * as fg from 'fast-glob'
import * as path from 'path'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

// Check if tsconfig.json exists
if (!existsSync('tsconfig.json')) {
  throw new Error('tsconfig.json does not exist in the current directory')
}

// Check if ./schemas directory exists, if not create it
if (!existsSync('./schemas')) {
  mkdirSync('./schemas')
}

// Get all TypeScript files in the ./src/dto directory
const files = fg.sync('./**/src/dto/*.ts')

// Generate a JSON schema for each file
files.forEach(file => {
  // Get the base name of the file (without the .ts extension)
  const baseName = path.basename(file, '.ts')

  // Generate the JSON schema and save it in the ./schemas directory
  execSync(`npx typescript-json-schema tsconfig.json ${baseName} --required > ./schemas/${baseName}.json`)
})
