import Joi from 'joi';
import validationHelper from '../helpers/ValidationHelper.js';

const checkAdvert = (req, res, next) => {
  const advertSchemas = Joi.object().keys({
    name: Joi.string().trim().max(50).required(),
    enDescription: Joi.string().trim().required().label('English description'),
    frDescription: Joi.string().trim().required().label('French description'),
    rwDescription: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda description'),
    images: Joi.optional(),
  });
  const schemasValidation = Joi.validate(req.body, advertSchemas);
  validationHelper(req, res, schemasValidation, next);
};
export default checkAdvert;
