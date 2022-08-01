import express from 'express';
import {
  activateCarousel,
  archiveCarousel,
  createCarousel,
  deleteCarousel,
  getActiveCarousels,
  getAllCarousels,
  getSpecificCarousel,
  updateCarousel,
} from '../controllers/carouselController.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.single('image'),
  createCarousel
);
router.get('', checkToken, getAllCarousels);
router.get('/active', getActiveCarousels);
router.get('/:itemId', checkToken, getSpecificCarousel);
router.patch('/:itemId', checkToken, updateCarousel);
router.delete('/:itemId', checkToken, deleteCarousel);
router.patch('/activate/:itemId', checkToken, activateCarousel);
router.patch('/archive/:itemId', checkToken, archiveCarousel);

export default router;
