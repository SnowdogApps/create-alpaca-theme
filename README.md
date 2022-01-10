# Alpaca Theme CLI

This is a tool for quickly scaffolding Snowdog Alpaca Theme based child theme for Magento 2 projects.</br>

Run command bellow from Magento project root directory:
```
npx alpaca-theme
```

Visit links below to fully utilize Alpaca Theme:</br>
* To learn how to work with Alpaca-Theme visit - [Alpaca Theme docs](https://lab.snowdog.pro/patrykbura/alpaca-boilerplate/-/tree/feature/80366#working-with-alpaca-theme)
* To learn about frontools visit - [Frontools docs](https://github.com/SnowdogApps/magento2-frontools)
* See Alpaca Components - [Alpaca Componenets demo](https://magento2-alpaca-theme-git-master-snowdog1.vercel.app/)
* See Alpaca Boilerplate exemplary code - [Alpaca Boilerplate](https://lab.snowdog.pro/patrykbura/alpaca-boilerplate/-/tree/feature/80366)


***
## Testing locally


* Clone this repo
```
git clone git@lab.snowdog.pro:patrykbura/alpaca-theme-npm.git
```
* Switch to develop branch
```
git checkout develop
```
* Link downloaded npm package (from package dir)
```
npm link
```
* Install globally
```
npm install -g
```
* From any magento project root directory run
```
npx alpaca-theme
```

1. Check if you can choose your child theme in admin panel</br>
_Admin Panel -> Content -> Design -> Configuration_</br>
2. Run components in Fractal:</br>
_Use 'yarn dev' in Snowdog_Components directory_

## To do before realease:

* _Gitlab links need to be changed to Github_
* _Testing locally section will be deleted_
* _Enable Alpaca Packages download & disable theme-fronetned-alpaca test branch_
* _Move this repo to OpenSource_