import Joi from 'joi';
import validationHelper from '../helpers/ValidationHelper.js';

const checkService = (req, res, next) => {
  const serviceSchemas = Joi.object().keys({
    name: Joi.string().trim().max(100).required(),
    enSmallDescription: Joi.string()
      .trim()
      .required()
      .label('English small description'),
    frSmallDescription: Joi.string()
      .trim()
      .required()
      .label('French small description'),
    rwSmallDescription: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda small description'),
    enBackground: Joi.string().trim().required().label('English background'),
    frBackground: Joi.string().trim().required().label('French background'),
    rwBackground: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda background'),
    enBeneficiaries: Joi.string()
      .trim()
      .required()
      .label('English beneficiaries'),
    frBeneficiaries: Joi.string()
      .trim()
      .required()
      .label('French beneficiaries'),
    rwBeneficiaries: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda beneficiaries'),
    enChallenges: Joi.string().trim().required().label('English challenges'),
    frChallenges: Joi.string().trim().required().label('French challenges'),
    rwChallenges: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda challenges'),
  });
  const schemasValidation = Joi.validate(req.body, serviceSchemas);
  validationHelper(req, res, schemasValidation, next);
};
export default checkService;
