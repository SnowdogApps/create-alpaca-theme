import promiseExec from './utils/promiseExec.js'

export function magentoUpgrade() {
  return promiseExec('bin/magento setup:upgrade', (msg) => {
    return `There was an error while upgrading Magento instance: ${msg}`
  })
}
