import mysql from 'mysql'
import { readFile } from 'fs/promises'

// GETTING DATABASE VALUES FROM .ENV TABLE IN PHP FORMAT
function getValue(table, name) {
  return table.join('')
    .split(',')
    .filter((x) => x.includes(name))[0]
    .split(' ')
    .pop()
    .replace(/['"]+/g, '')
}

async function getDatabaseDetails() {
  const file = await readFile(('./app/etc/env.php'))
  const dbTable = file.toString().split('[').filter(x => x.includes('host'))
  const host = getValue(dbTable, 'host')
  const database = getValue(dbTable, 'dbname')
  const user = getValue(dbTable, 'username')
  const password = getValue(dbTable, 'password')

  return {
    host,
    user,
    password,
    database
  }
}

async function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err) => {
      if (err) {
        reject(err.sqlMessage)
      } else {
        resolve()
      }
    })
  })
}

async function execute(connection, dataSql) {
  return new Promise((resolve, reject) => {
    connection.connect(async (err) => {
      if (err) {
        reject(err)
      }

      const sqlQueryArray = dataSql.toString().split(');')
      const result = await Promise.allSettled(sqlQueryArray.map(async (query) => {
        const updatedQuery = query + ');' // eslint-disable-line

        await executeQuery(connection, updatedQuery)
      }))

      resolve(result.map((r) => { // eslint-disable-line
        if (r.status === 'rejected') {
          return r.reason
        }
      }).filter((x) => x))
    })
  })
}

export default async function runQueries() {
  const dataSql = await readFile(new URL('../templates/database/queries.sql', import.meta.url))
  const connection = mysql.createConnection(await getDatabaseDetails())
  const errors = await execute(connection, dataSql)

  connection.end()

  return errors
}
