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
  const errArr = []

  connection.connect((err) => {
    if (err) {
      throw err
    }

    const sqlQueryArray = dataSql.toString().split(');')

    sqlQueryArray.forEach(singleQuery => {
      if (singleQuery) {
        const updatedQuery = singleQuery += ");";
        connection.query(updatedQuery, (err, res) => {
          if (err) {
            errArr.push(err.sqlMessage)
          }
          console.log("Records inserted");
        });
      }
    })
  })

  setTimeout(() => {
    console.log(errArr)
  },500)

}
