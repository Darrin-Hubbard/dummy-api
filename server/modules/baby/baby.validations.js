import Joi from 'joi'

export const newbaby = Joi.object().keys({
  first_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  last_name: Joi.string().required(),
})
