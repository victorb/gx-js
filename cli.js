#! /usr/bin/env node
const path = require('path')
var fs = require('fs-extra')
//   Hooks to implement:
//     post-import
//         called after a new package is imported and its info written to package.json.
//         takes the hash of the newly imported package as an argument.
//     post-init
//         called after a new package is initialized.
//         takes an optional argument of the directory of the newly init'ed package.
//     pre-publish
//         called during gx publish before the package is bundled up and added to ipfs.
//         currently takes no arguments.
//     post-publish
//         called during gx publish after the package has been added to ipfs.
//         takes the hash of the newly published package as an argument.
//     post-update
//         called during gx update after a dependency has been updated.
//         takes the old package ref and the new hash as arguments.
//     post-install
//         called after a new package is downloaded, during install and import.
//         takes the path to the new package as an argument.
//     install-path
//         called during package installs and imports.
//         sets the location for gx to install packages to.
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
    var items = [] // files, directories, symlinks, etc
    fs.walk(path_for_package)
      .on('data', function (item) {
        items.push(item.path)
      })
      .on('end', function () {
        const src = items[1]
        const packageName = require(path.join(src, 'package.json')).name
        const dest = path.join('node_modules', packageName)
        console.log(dest)
        console.log(src)
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
