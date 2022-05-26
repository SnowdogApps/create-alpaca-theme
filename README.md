# Create Alpaca Theme

Quickly create Magento 2 Child Theme based on [Snowdog Alpaca Theme](https://github.com/SnowdogApps/magento2-alpaca-theme).

## Requirements
  * Working and valid Magento 2.4 instance.
  * Node >= 16.

## Quick Overview
- Run from Magento project root directory:
  ```sh
  npx @snowdog/create-alpaca-theme
  ```
- Select installation options.

After installation is completed:
- Go to `Admin Panel -> Content -> Design -> Configuration` and choose your theme.
- Run `yarn dev` in `app/design/frontend/VENDOR_NAME/CHILD_THEME_NAME/Snowdog_Components` directory to see components in Fractal environment.

## What it does?
- Installs following packages:
  - [snowdog/frontools](https://github.com/SnowdogApps/magento2-frontools)
  - [snowdog/module-alpaca-packages](https://github.com/SnowdogApps/magento2-alpaca-packages) containing:
    - [snowdog/theme-frontend-alpaca](https://github.com/SnowdogApps/magento2-alpaca-theme)
    - [magepal/magento2-gmailsmtpapp](https://github.com/magepal/magento2-gmail-smtp-app)
    - [magepal/magento2-googletagmanager](https://github.com/magepal/magento2-google-tag-manager)
    - [mailchimp/mc-magento2](https://github.com/mailchimp/mc-magento2)
    - [smile/elasticsuite](https://github.com/Smile-SA/elasticsuite)
    - [snowdog/module-alpaca-general](https://github.com/SnowdogApps/magento2-alpaca-general)
    - [snowdog/module-bullet-points](https://github.com/SnowdogApps/magento2-bullet-points)
    - [snowdog/module-csp](https://github.com/SnowdogApps/magento2-module-csp)
    - [snowdog/module-category-attributes](https://github.com/SnowdogApps/magento2-category-attributes)
    - [snowdog/module-menu](https://github.com/SnowdogApps/magento2-menu)
    - [snowdog/module-product-attribute-description](https://github.com/SnowdogApps/magento2-product-attribute-description)
    - [snowdog/module-shipping-latency](https://github.com/SnowdogApps/magento2-shipping-latency)
    - [snowdog/module-wishlist-unlocker](https://github.com/SnowdogApps/magento2-wishlist-unlocker)
    - [webshopapps/module-matrixrate](https://github.com/webshopapps/module-matrixrate)</br></br>
- Creates Alpaca Child Theme in `app/design/frontend/VENDOR_NAME/CHILD_THEME_NAME` including everything you need to start working with Alpaca:
   - Essential configuration files
   - Styles inheritance setup
   - Custom variables file in `Snowdog_Components/components/Atoms/variables/` directory
   - Example of how to change Sass variable value
   - Example of how to extend component styles (If selected during installation)
- Adds [frontools](https://github.com/SnowdogApps/magento2-frontools) configuration files in `dev/tools/frontools/config` directory.
- Updates database with essential Alpaca Tables (If selected during installation).
- Adds placeholder images.
- Upgrades Magento instance, compiles styles, JS files and SVGs.

## User guide
- [Alpaca Theme Docs](https://magento2-alpaca-docs.vercel.app/) - Learn how to utilize Alpaca Theme.

## Useful Links
  * [Alpaca Theme](https://github.com/SnowdogApps/magento2-alpaca-theme)
  * [Snowdog Frontools](https://github.com/SnowdogApps/magento2-frontools)
  * [Fractal guide](https://fractal.build/guide/)
  * [Alpaca Packages](https://github.com/SnowdogApps/magento2-alpaca-packages)
  * [Alpaca Components preview](https://magento2-alpaca-theme-git-master-snowdog1.vercel.app/)

## Testing and local development
  * Clone this repository
  * Change name of package in `package.json` to `create-alpaca-theme`
  * Install package globally: `npm install -g`
  * Link command running `npm link`
  * Run `npx create-alpaca-theme` from Magento project root directory

## Troubleshooting

* If you have problems with global npm persmission, check npm docs: [Resolving eaccess permissions error when installing package globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
* When running Warden or other dockerized Magento instance, make sure you run `npx @snowdog/create-alpaca-theme` from proper container.

****
2022 **[Snowdog](https://www.snow.dog)**
