#! /usr/bin/env node
const path = require('path')
var fs = require('fs-extra')
const cmds = {
  'post-import': () => {
    console.log(args)
  },
  'post-init': () => {
    console.log('Not implemented')
  },
  'pre-publish': () => {
    console.log('Not implemented')
  },
  'post-publish': () => {
    console.log('Not implemented')
  },
  'post-update': () => {
    console.log('Not implemented')
  },
  'post-install': (args) => {
    const path_for_package = args[2]
    var items = []
    fs.walk(path_for_package)
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
    console.log('Hook not supported')
  }
}
