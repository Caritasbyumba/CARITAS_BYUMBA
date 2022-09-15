import Joi from 'joi';
import validationHelper from '../helpers/ValidationHelper.js';

const checkDepartment = (req, res, next) => {
  const departmentSchemas = Joi.object().keys({
    enName: Joi.string().trim().max(50).required().label('English name'),
    frName: Joi.string().trim().max(50).required().label('French name'),
    rwName: Joi.string().trim().max(50).required().label('Kinyarwanda name'),
    enDescription: Joi.string().trim().required().label('English description'),
    frDescription: Joi.string().trim().required().label('French description'),
    rwDescription: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda description'),
    enObjectives: Joi.string().trim().required().label('English objectives'),
    frObjectives: Joi.string().trim().required().label('French objectives'),
    rwObjectives: Joi.string()
      .trim()
      .required()
      .label('Kinyarwanda objectives'),
  });
  const schemasValidation = Joi.validate(req.body, departmentSchemas);
  validationHelper(req, res, schemasValidation, next);
};
export default checkDepartment;
