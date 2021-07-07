pack-local-dependencies
===
Installs dependencies included with a [local path](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#local-paths)

## Usage
### Installation
```
$ npm i -D pack-local-dependencies
```

### Execution
Add the following postinstall script to your package.json
```json
{
  "scripts": {
    "postinstall": "pack-local-dependencies"
  }
}
```

### Postinstall script
If your sub-package requires a postinstall script, use `pack-local-dependencies:postinstall` instaed - This will run after pack-local-dependencies installs its dependencies.

#### Example
```json
{
  "name": "local-sub-module",
  "scripts": {
    "pack-local-dependencies:postinstall": "tsc"
  },
  "devDependencies": {
    "typescript": "~3.7.3"
  }
}
```

### Including local dependenices
Local dependencies have to be included with `file:` prefix in order to be recognized by `pack-local-dependencies`.

## Why?
npm does not run `npm install` for [dependencies included with local path](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#local-paths).

For example,
```json
{
  "name": "some-package",
  "dependencies": {
    "another-package": "file:../another-package"
  }
}
```

When installing `some-package`, npm will create a symlink from `../another-package` to `some-package/node_modules/another-package`, but it won't run `npm install` on `../another-package`, so `another-package` won't have its dependencies install and won't function properly.

## Solution
After including `pack-local-dependencies` in your package's `postinstall` script, it will run every time your package is installed, and will find all the dependencies in your packages that included using a local path, then it iterates them and runs `npm install` on every package to install its dependencies.

## Official fix
The npm team proposed an RFC to fix this issue: 
https://github.com/npm/rfcs/pull/150