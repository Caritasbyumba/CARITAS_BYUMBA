import express from 'express';
import {
  activateAdvert,
  archiveAdvert,
  createAdvert,
  deleteAdvert,
  getActiveMainAdverts,
  getActiveAdverts,
  getAllAdverts,
  getSpecificAdvert,
  updateAdvert,
} from '../controllers/advertsController.js';
import checkAdvert from '../middlewares/checkAdvert.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.array('images'),
  checkAdvert,
  createAdvert
);
router.get('', getAllAdverts);
router.get('/active', getActiveAdverts);
router.get('/main', getActiveMainAdverts);
router.get('/:itemId', getSpecificAdvert);
router.patch(
  '/:itemId',
  checkToken,
  upload.array('images'),
  checkAdvert,
  updateAdvert
);
router.delete('/:itemId', checkToken, deleteAdvert);
router.patch('/activate/:itemId', checkToken, activateAdvert);
router.patch('/archive/:itemId', checkToken, archiveAdvert);

export default router;
