import Joi from 'joi';
import validationHelper from '../helpers/ValidationHelper.js';

const checkMoreonus = (req, res, next) => {
  const moreonusSchemas = Joi.object().keys({
    enCallToActionBtn: Joi.string()
      .trim()
      .max(15)
      .required()
      .label('English button name'),
    frCallToActionBtn: Joi.string()
      .trim()
      .max(15)
      .required()
      .label('French button name'),
    rwCallToActionBtn: Joi.string()
      .trim()
      .max(15)
      .required()
      .label('Kinyarwanda button name'),
    enDescription: Joi.string().trim().required().label('English description'),
    frDescription: Joi.string().trim().required().label('French description'),
    rwDescription: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda description'),
  });
  const schemasValidation = Joi.validate(req.body, moreonusSchemas);
  validationHelper(req, res, schemasValidation, next);
};
export default checkMoreonus;
