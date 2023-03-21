import mysql from 'mysql2'
import debug from 'debug'
import fs from 'fs'
import util from 'util'

const log = debug('app')
// Note : You can remove mysqldetaillog and use log instead
const mysqldetaillog = debug('mysqldetaillog')

const pool = mysql.createPool({ host: process.env.MYSQL_HOSTNAME, user: process.env.MYSQL_USERNAME, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE, timezone: 'Z', port: process.env.MYSQL_PORT})

pool.on('connection', (connection) => mysqldetaillog(`Mysql Connection #${connection.threadId} created`))
pool.on('acquire', (connection) => mysqldetaillog(`Mysql Connection #${connection.threadId} acquired`))
pool.on('release', (connection) => mysqldetaillog(`Mysql Connection #${connection.threadId} released`))

pool.query = util.promisify(pool.query)

export const connectMysql = () => {
  pool.getConnection(function (err, connection) {
    if (err) {
      log(`Mysql ${err.toString()}`)
      process.exit(1)
    }
    log(`Mysql connection established`)
    connection.release()
  })
}

export { pool }
