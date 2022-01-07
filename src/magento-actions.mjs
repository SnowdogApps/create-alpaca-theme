import promiseExec from '../utils/promiseExec.mjs'

export function magentoUpgrade() {
  return promiseExec('bin/magento setup:upgrade', msg => {
    return `There was an error while upgrading Magento instance: ${msg}`
  })
}
