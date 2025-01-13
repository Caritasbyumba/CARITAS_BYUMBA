import express from 'express';
import {
  activatePartner,
  archivePartner,
  createPartner,
  deletePartner,
  getActivePartners,
  getAllPartners,
  getSpecificPartner,
  updatePartner,
} from '../controllers/partnerscontroller.js';
import checkPartner from '../middlewares/checkPartner.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.single('image'),
  checkPartner,
  createPartner
);
router.get('', getAllPartners);
router.get('/active', getActivePartners);
router.get('/:itemId', getSpecificPartner);
router.patch(
  '/:itemId',
  checkToken,
  upload.single('image'),
  checkPartner,
  updatePartner
);
router.delete('/:itemId', checkToken, deletePartner);
router.patch('/activate/:itemId', checkToken, activatePartner);
router.patch('/archive/:itemId', checkToken, archivePartner);

export default router;
