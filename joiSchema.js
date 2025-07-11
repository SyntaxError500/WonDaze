// joiSchema.js
const Joi = require('joi');

module.exports.validatingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow('', null)
  }).required(),
}).required();

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(0).max(5),
        Comment:Joi.string().required(),
    }).required()
});
