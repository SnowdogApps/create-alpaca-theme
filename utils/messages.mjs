const log = console.log
import colors from 'colors'

export const CLISuccesMessage = (themeName) => {
  return log(
    colors.yellow('\nInstallation completed successfully!'),
    colors.blue('\n\nGo to Admin Panel -> Content -> Design -> Configuration and choose your theme'),
    (`(${colors.yellow(themeName)}).`),
    colors.blue(`\nUse ${colors.yellow(`'yarn dev'`)} in Snowdog_Components dir to run components in Fractal`),
    colors.blue('\nVisit Alpaca Docs to learn how to work with Alpaca Theme.'),
    colors.blue('\nTo see exemplary code go to Alpaca Boilerplate.'),
    colors.yellow('\n\n2022 Snowdog || https://snow.dog || https://github.com/SnowdogApps \n')
  )
}