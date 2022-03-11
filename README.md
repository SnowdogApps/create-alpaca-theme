# Create Alpaca Theme

Quickly create Magento 2 Child Theme based on Snowdog Alpaca Theme.
## Quick Overview
- Run from Magento project root directory:
  ```sh
  npx create-alpaca-theme
  ```
- Select installation options.
- Go to `Admin Panel -> Content -> Design -> Configuration` and choose your theme.
- Run `yarn dev` in **Snowdog_Components** directory to see components in Fractal environment.
## Requirements
  * Valid Magento instance.
  * Node >= 16.

## User guide
- [Working with Alpaca Theme]() - Learn how to utilize Alpaca Theme.
- [Alpaca Theme step by step setup]() - How to set up Alpaca from scratch, without **create-alpaca-theme**.
- [Current Alpaca Release](https://github.com/SnowdogApps/magento2-alpaca-theme) - Visit Alpaca's Github page.
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
- Creates necessary files structure in child theme including SCSS, JS, and elemental config files.
- Configures frontools.
- Extends exemplary component (If selected during installation).
- Updates database with essential Alpaca Tables (If selected during installation).
- Adds placeholder images.
- Upgrades Magento instance, compile styles, JS files and SVG.

## Useful Links
  * [Alpaca Theme details](https://github.com/SnowdogApps/magento2-alpaca-theme)
  * [Snowdog Frontools](https://github.com/SnowdogApps/magento2-frontools)
  * [Valet Plus](https://github.com/weprovide/valet-plus/wiki/Database)
  * [Fractal guide](https://fractal.build/guide/)
  * [Alpaca Packages](https://github.com/SnowdogApps/magento2-alpaca-packages)
  * [Alpaca Components guide](https://github.com/SnowdogApps/magento2-alpaca-theme/blob/master/Snowdog_Components/README.md)
  * [Alpaca Components preview](https://magento2-alpaca-theme-git-master-snowdog1.vercel.app/)
  * [Theme inheritance magento docs](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-inherit.html)
  * [Layout instructions magento docs](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/layouts/xml-instructions.html)
****
2022 **[Snowdog](https://www.snow.dog)**
