import express from 'express';
import {
  activateDepartment,
  archiveDepartment,
  createDepartment,
  deleteDepartment,
  getActiveDepartment,
  getAllDepartment,
  getSpecificDepartment,
  updateDepartment,
} from '../controllers/departmentController.js';
import checkDepartment from '../middlewares/checkDepartment.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkDepartment, createDepartment);
router.get('', getAllDepartment);
router.get('/active', getActiveDepartment);
router.get('/:itemId', getSpecificDepartment);
router.patch('/:itemId', checkToken, checkDepartment, updateDepartment);
router.delete('/:itemId', checkToken, deleteDepartment);
router.patch('/activate/:itemId', checkToken, activateDepartment);
router.patch('/archive/:itemId', checkToken, archiveDepartment);

export default router;
