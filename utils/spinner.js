const SPINNER_PATH = ['\\', '|', '/', '-']
const DEAFULT_SPINNER_SPEED = 100

export default class Spinner {
  constructor(spinnerSpeed = DEAFULT_SPINNER_SPEED) {
    this.spinnerId = null
    this.spinnerSpeed = spinnerSpeed
    this.iteratorValue = 0
  }

  start() {
    this.spinnerId = setInterval(() => {
      // eslint-disable-next-line
      process.stdout.write(`\r${SPINNER_PATH[this.iteratorValue++]}`)
      this.iteratorValue &= 3
    }, this.spinnerSpeed)
  }

  stop() {
    clearInterval(this.spinnerId)
  }
}
