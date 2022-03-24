import { exec } from 'child_process'

export default function promiseExec(command, errorMsg) {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(errorMsg(error))
      }

      resolve()
    })
  })
}
