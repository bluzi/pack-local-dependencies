#!/usr/bin/env node

const { execSync } = require('child_process')
const { resolve } = require('path')

const { readDependencies, isLocalPath } = require('./utils')

const prefix = 'pack-local-dependencies:'
const commands = [
  'npm i',
  `npm run ${prefix}postinstall`,
]

readDependencies()
  .filter(([, version]) => isLocalPath(version))
  .forEach(([dependency, localPath]) => {
    const absolutePath = resolve(localPath.replace('file:', ''))
    console.log(`${dependency}: Executing 'npm i' in ${absolutePath}`)
    commands.forEach((command) =>
      execSync(command, {
        stdio: 'inherit',
        cwd: absolutePath,
      }))
  })