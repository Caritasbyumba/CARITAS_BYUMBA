import express from 'express';
import {
  activatePublication,
  archivePublication,
  createPublication,
  deletePublication,
  getActivePublications,
  getAllPublications,
  getSpecificPublication,
  updatePublication,
} from '../controllers/publicationsController.js';
import checkPublication from '../middlewares/checkPublication.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.array('images'),
  checkPublication,
  createPublication
);
router.get('', getAllPublications);
router.get('/active', getActivePublications);
router.get('/:itemId', getSpecificPublication);
router.patch(
  '/:itemId',
  checkToken,
  upload.array('images'),
  checkPublication,
  updatePublication
);
router.delete('/:itemId', checkToken, deletePublication);
router.patch('/activate/:itemId', checkToken, activatePublication);
router.patch('/archive/:itemId', checkToken, archivePublication);

export default router;
