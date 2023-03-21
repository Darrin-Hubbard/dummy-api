import express from 'express'
import { baby } from './baby.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { newbaby } from './baby.validations'

const babyRoutes = express.Router()

babyRoutes.get('/list', asyncWrapper(baby.list))
babyRoutes.get('/', asyncWrapper(baby.one))
babyRoutes.post('/', validate(newbaby), asyncWrapper(baby.create))
babyRoutes.put('/', validate(newbaby), asyncWrapper(baby.update))
babyRoutes.delete('/', asyncWrapper(baby.remove))

export { babyRoutes }
