import { exec } from 'child_process'

export function magentoUpgrade() {
  return new Promise((resolve, reject) => {
    exec('bin/magento setup:upgrade', error => {
      if (error) {
        reject(`Error upgrading Magento\n${error.message}`);
      }

      resolve('Magento instance upgraded');
    });
  });
};
