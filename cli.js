#! /usr/bin/env node
const path = require('path')
const fs = require('fs-extra')

const cmds = {
  // Hook for after the initialization of a package
  'post-init': (args) => {
    const packageJson = require(path.join(process.cwd(), 'package.json'))
    if (packageJson.scripts === undefined) {
      packageJson.scripts = {}
    }
    packageJson.scripts.postpublish = 'gx publish'
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2))
  },
  // Hook for after installing a package
  'post-install': (args) => {
    const pathForPackage = args[2]
    var items = []
    fs.walk(pathForPackage)
      .on('data', function (item) {
        items.push(item.path)
      })
      .on('end', function () {
        // second item we find is the actual directory of the package
        const src = items[1]
        const packageName = require(path.join(src, 'package.json')).name
        const dest = path.join('node_modules', packageName)
        fs.ensureSymlinkSync(src, dest)
      })
  },
  // Prints the path where to install modules
  'install-path': () => {
    console.log('node_modules')
  }
}

const args = process.argv.slice(2)
const isHook = args[0] === 'hook'
if (isHook) {
  const hookName = args[1]
  if (cmds[hookName] !== undefined) {
    cmds[hookName](args)
  } else {
    console.log(`Could not find hook ${hookName}`)
  }
} else {
  console.log('No command specified')
  Object.keys(cmds).forEach((key) => {
    console.log('-', key)
  })
}
