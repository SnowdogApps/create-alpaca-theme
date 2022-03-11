import colors from 'colors'

const { log } = console

export const CLISuccesMessage = (themeName) => {
  return log(
    colors.yellow('\nInstallation completed successfully!'),
    colors.blue('\n\n👉 Go to'),
    colors.yellow('Admin Panel -> Content -> Design -> Configuration'),
    colors.blue('and choose your theme'),
    (`(${colors.yellow(themeName)}).`),
    colors.blue(`\n✨ Use ${colors.yellow('yarn dev')} in Snowdog_Components dir to run components in Fractal.`),
    colors.blue('\n🔎 Read'),
    colors.yellow('Alpaca Docs'),
    colors.blue('to learn how to use Alpaca Theme.'),
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
