const Joi = require('joi');

const petSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      breed: Joi.string(),
});
const updateSchema = Joi.object({
      name: Joi.string(),
      age: Joi.number(),
      type: Joi.string(),
      breed: Joi.string(),
});
module.exports = {
      petSchema,
      updateSchema
}