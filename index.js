#!/usr/bin/env node

/**
 * Copyright (c) 2022-present, Snowdog Apps.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ----------------------------
// DO NOT MODIFY THIS FILE !
// ----------------------------

import init from './src/create-alpaca-theme.js'

const localNodeVersion = process.versions.node
const semver = localNodeVersion.split('.')
const major = semver[0]

if (major < 14) {
  console.error(
    'You are running node',
    localNodeVersion,
    '\nnpx alpaca-theme requires Node 14 or higher.',
    '\nIn order to continue update your Node version.'
  )
  process.exit()
}

init()
