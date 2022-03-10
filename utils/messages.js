import colors from 'colors'

const { log } = console

export const CLISuccesMessage = (themeName) => {
  return log(
    colors.yellow('\nInstallation completed successfully!'),
    colors.blue('\n\nGo to Admin Panel -> Content -> Design -> Configuration and choose your theme'),
    (`(${colors.yellow(themeName)}).`),
    colors.blue(`\nUse ${colors.yellow('\'yarn dev\'')} in Snowdog_Components dir to run components in Fractal`),
    colors.blue('\nRead Alpaca Docs to learn how to work with Alpaca Theme.'),
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
