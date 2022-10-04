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
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.single('image'),
  checkService,
  createService
);
router.get('', getAllService);
router.get('/active', getActiveService);
router.get('/:itemId', getSpecificService);
router.patch(
  '/:itemId',
  checkToken,
  upload.single('image'),
  checkService,
  updateService
);
router.delete('/:itemId', checkToken, deleteService);
router.patch('/activate/:itemId', checkToken, activateService);
router.patch('/archive/:itemId', checkToken, archiveService);

export default router;
