#!/usr/bin/env node

const { existsSync } = require('fs')
const { resolve } = require('path')

const { readDependencies, isLocalPath, runNpmScript, install } = require('./utils')

const prefix = 'pack-local-dependencies:'

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
    install(absolutePath)
    runNpmScript(absolutePath, `${prefix}postinstall`)
  })