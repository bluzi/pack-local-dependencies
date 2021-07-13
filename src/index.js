#!/usr/bin/env node

const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { resolve } = require('path')

const { readDependencies, isLocalPath } = require('./utils')

const prefix = 'pack-local-dependencies:'
const commands = [
  'npm i',
  `npm run ${prefix}postinstall`,
]

const dependencies = readDependencies()
const devDependencies = readDependencies('devDependencies')

Object.entries({ ...dependencies, ...devDependencies })
  .filter(([, version]) => isLocalPath(version))
  .forEach(([dependency, localPath]) => {
    const absolutePath = resolve(localPath.replace('file:', ''))
    if (!existsSync(absolutePath)) {
      console.warn(`${dependency}: Could not find package in '${localPath}', assuming it was not installed`)
      return
    }

    console.log(`${dependency}: Executing 'npm i' in ${absolutePath}`)
    commands.forEach((command) => {
      try {
        execSync(command, {
          stdio: 'inherit',
          cwd: absolutePath,
        })
      } catch(e) {
        console.warn(`${dependency}: command '${command}' exited with code ${e.status}`)
      }
    })
  })