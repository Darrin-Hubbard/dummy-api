import { httpStatus } from '../utils/httpStatus'
import { AppError } from '../utils/appError'
import { pool } from '../config/mysqlconnect'

export const secretCallback = function (req, payload, done) {
  let sub = payload.sub
  pool.query(`SELECT secret FROM users WHERE id = '${sub}'`).then(users => {
    const [ user ] = users
    if (!user) return done(new AppError('Invalid user', httpStatus.UNAUTHORIZED))
    else return done(null, user.secret)
  })
}
