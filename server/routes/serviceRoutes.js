import express from 'express';
import {
  activateService,
  archiveService,
  createService,
  deleteService,
  getActiveService,
  getAllService,
  getSpecificService,
  updateService,
} from '../controllers/serviceController.js';
import checkService from '../middlewares/checkService.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkService, createService);
router.get('', getAllService);
router.get('/active', getActiveService);
router.get('/:itemId', getSpecificService);
router.patch('/:itemId', checkToken, checkService, updateService);
router.delete('/:itemId', checkToken, deleteService);
router.patch('/activate/:itemId', checkToken, activateService);
router.patch('/archive/:itemId', checkToken, archiveService);

export default router;
