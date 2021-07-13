const { readFileSync, existsSync } = require('fs')

const readDependencies = (key = 'dependencies') => {
  const packageJsonPath = './package.json'

  if (!existsSync(packageJsonPath)) {
    throw new Error(`Could not find package.json in ${process.cwd()}`)
  }

  const packageJsonContents = readFileSync('package.json', 'utf-8')
  const packageJson = JSON.parse(packageJsonContents)

  return packageJson?.[key] || {}
}

const isLocalPath = (version) => {
  if (version.startsWith('file:')) return true

  return false
}

module.exports = {
  readDependencies,
  isLocalPath,
}