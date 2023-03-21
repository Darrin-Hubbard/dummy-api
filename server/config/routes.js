import express from 'express'
import multer from 'multer'
import { babyRoutes } from '../modules/baby/baby.routes'
const Router = express.Router()

Router.all('/health-check', (req, res) => res.json({ message: 'OK' }))
Router.use('/baby', babyRoutes)

/*
Router.post('/fileupload', multer({ storage: diskStorage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

Router.post('/s3fileupload', multer({ storage: s3Storage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})
*/

export { Router }
