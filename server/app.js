import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import helmet from 'helmet'
import cors from 'cors'
import { httpStatus } from './utils/httpStatus'
import { AppError } from './utils/appError'
import { secretCallback } from './utils/secretCallback'
import { connectMysql } from './config/mysqlconnect'

const app = express()
app.set('trust proxy', true)

const whitelist = [
  'http://localhost:3000',
]

/*
const STAGE_DOMAINS = [
  'https://billgodfrey.site',
  'https://www.billgodfrey.site',
]

const PRODUCTION_DOMAINS = [
  'https://billgodfrey.com',
  'https://www.billgodfrey.com',
  'https://cms.billgodfrey.com',
]

let  whitelist = []

if (process.env.APP_ENVIRONMENT === 'dev') {
  whitelist = LOCAL_DOMAINS
} else if (process.env.APP_ENVIRONMENT === 'stage') {
  whitelist = STAGE_DOMAINS.concat(LOCAL_DOMAINS)
} else if (process.env.APP_ENVIRONMENT === 'prod') {
  whitelist = PRODUCTION_DOMAINS
}
*/

export { whitelist }

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(helmet())
app.use(
  '/v1',
  jwt({
    secret: secretCallback,
  }).unless({
    path: [
      '/v1/health-check',
      '/v1/baby',
      '/v1/baby/list',
    ],
    requestProperty: 'auth'
  })
)
app.use('/v1', Router)

// Handle 404
app.use(function (req, res, next) {
  throw new AppError('Resource not found', httpStatus.NOT_FOUND)
})

if (process.env.USE_MONGODB === 'true') connectMongo()
if (process.env.USE_MYSQL === 'true') connectMysql()

app.use(errorHandler)

export { app }
