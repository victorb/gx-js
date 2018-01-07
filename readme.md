# gx-js (WIP)

Fetch and publish JavaScript modules from/to IPFS

JavaScript version of https://github.com/whyrusleeping/gx-go

## Background

Instead of fetching modules to a third-party, you can actually really simple host your
own modules or ask other nodes to help rehost your modules.

## Requirements

* NodeJS (5.11.1 or later)
* npm (3.10.3 or later)
* IPFS (0.4.2 or later) (https://ipfs.io)
* gx (0.8.0 or later) (https://github.com/whyrusleeping/gx)

## Installation

`npm install -g gx-js`

## Installing modules

- First, setup your project to use gx-js with gx
  - `gx init --lang js`
- Import the package you want to use, we'll use a test library called "gx-lib-a"
  - `gx import Qmd4bNLqHGxRgZhp6jrkisNCffDU3SwSd3XWj7ukendco2`
- Now you should have a `node_modules/` directory with two directories inside it. It should look
  something like this:

```
node_modules
├── gx
│   └── ipfs
│       └── Qmd4bNLqHGxRgZhp6jrkisNCffDU3SwSd3XWj7ukendco2
│           └── gx-lib-a
│               ├── index.js
│               └── package.json
└── gx-lib-a -> /home/user/projects/victorbjelkholm/gx-root-package/node_modules/gx/ipfs/Qmd4bNLqHGxRgZhp6jrkisNCffDU3SwSd3XWj7ukendco2/gx-lib-a

5 directories, 2 files
```

Now you can import from two paths, the first being much more secure but much more
tearse. If you're dealing with multiple versions of the same library, you probably
want to use the first way as well.

1. Require from `gx/ipfs`, using the full path

```
const libAFromGX = require('gx/ipfs/Qmd4bNLqHGxRgZhp6jrkisNCffDU3SwSd3XWj7ukendco2/gx-lib-a')
console.log(libAFromGX)
```

2. Require by using the module name only (might not work if multiple packages
  use the same name)

```
const libA = require('gx-lib-a')
console.log(libA)
```

## Publishing modules

To publish modules, you will need to run a IPFS node locally, then you can
just run `gx publish` and you get a hash that you can import in other projects.

## Discovering modules

Currently, there is no handy mechanism for discovering modules. If you're a 
module publisher, you could include the version hash in the git tag or Github
Release.

## License

MIT 2016 (Victor Bjelkholm)
