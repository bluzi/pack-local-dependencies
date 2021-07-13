const { readFileSync, existsSync } = require('fs')
const { resolve } = require('path')
const { execSync } = require('child_process')

const readPackage = (path = './') => {
  const packagePath = resolve(path, 'package.json')

  if (!existsSync(packagePath)) {
    throw new Error(`Could not find package.json in ${process.cwd()}`)
  }

  const packageContents = readFileSync(packagePath, 'utf-8')
  const package = JSON.parse(packageContents)

  return package
}

const readDependencies = (key = 'dependencies') => {
  const packageJson = readPackage()

  return packageJson?.[key] || {}
}

const isLocalPath = (version) => {
  if (version.startsWith('file:')) return true

  return false
}

const runNpmScript = (path, script) => {
  const packageJson = readPackage(path)

  if (packageJson?.scripts?.[script]) {
    const command = `npm run ${script}`
    
    try {
      execSync(`npm run ${script}`, {
        stdio: 'inherit',
        cwd: path,
      })
    } catch (e) {
      throw new Error(`command '${command}' exited with code ${e.status}`)
    }
  }
}

const install = (path) => {
  const command = `npm i`

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: absolutePath,
    })
  } catch (e) {
    throw new Error(`command '${command}' exited with code ${e.status}`)
  }
}

module.exports = {
  readDependencies,
  isLocalPath,
  runNpmScript,
  install,
}