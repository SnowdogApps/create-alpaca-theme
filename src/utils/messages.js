import colors from 'colors'

const { log } = console

export const CLISuccesMessage = (fullThemeName, exemplaryComponent, themeName) => {
  return log(
    colors.yellow('\nInstallation completed successfully!'),
    colors.blue(`\n\n✅ Theme created in ${colors.green(`app/design/frontend/Snowdog/${themeName}`)}`),
    colors.blue('\n👉 Go to'),
    colors.green('Admin Panel -> Content -> Design -> Configuration'),
    colors.blue('and choose your theme'),
    (`(${colors.green(fullThemeName)})`),
    colors.blue(`\n✨ Use ${colors.green('yarn dev')} in`),
    colors.green(`app/design/frontend/Snowdog/${themeName}/Snowdog_Components`),
    colors.blue('to run components in Fractal'),
    colors.blue('\n🔎 Read'),
    colors.green('Alpaca Docs'),
    colors.blue('to learn how to use Alpaca Theme'),
    exemplaryComponent ? colors.blue(`\n\nVariables ${colors.green('$color-primary')} and ${colors.green('$button-text-color')} have been changed as an example`) : '',
    exemplaryComponent ? colors.blue(`\nSee ${colors.green(`_${themeName}-variables.scss`)} and ${colors.green(`_${themeName}-button-variables.scss`)} to edit them`) : '',
    colors.yellow('\n\n2022 Snowdog || https://snow.dog || https://github.com/SnowdogApps \n')
  )
}

export const databaseErrorMessage = () => {
  return log(
    colors.red('During installation there was an issue running some database queries.'),
    colors.red('\nIt will not affect the basic functioning of Alpaca but might cause some problems with certain features.'),
    colors.red('\nSee details below:')
  )
}

export const notMagentoInstanceMessage = () => {
  return log(
    colors.red('This directory is not valid Magento instance.'),
    `\n${colors.red('Try again from Magento project root directory.')}`
  )
}
