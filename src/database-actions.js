/* eslint-disable */
import mysql from 'mysql';
import { readFile } from 'fs/promises'

export default async function runQueries() {
  const dataSql = await readFile(new URL('../templates/database/queries.sql', import.meta.url))
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "testbase"
  })

  const errors = await execute(connection, dataSql)
  connection.end()
  return errors
}

async function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) {
        reject(err.sqlMessage)
      } else {
        resolve()
      }
    });
  })
}

async function execute(connection, dataSql) {
  return new Promise((resolve, reject) => {
    const errArr = []

    connection.connect(async (err) => {
      if (err) {
        reject(err)
      }

      const sqlQueryArray = dataSql.toString().split(');')

      const result = await Promise.allSettled(sqlQueryArray.map(async(query) => {
        const updatedQuery = query += ");";
        await executeQuery(connection, updatedQuery)
      }))

      resolve(result.map((r) => {
        if (r.status === 'rejected') {
          return r.reason
        }
      }).filter((x) => x))
    })
  })
}
