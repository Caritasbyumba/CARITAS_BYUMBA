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
  '/carousels/add',
  checkToken,
  upload.single('image'),
  createCarousel
);
router.get('/carousels', checkToken, getAllCarousels);
router.get('/carousels/active', getActiveCarousels);
router.get('/carousels/:itemId', checkToken, getSpecificCarousel);
router.patch('/carousels/:itemId', checkToken, updateCarousel);
router.delete('/carousels/:itemId', checkToken, deleteCarousel);
router.patch('/carousels/activate/:itemId', checkToken, activateCarousel);
router.patch('/carousels/archive/:itemId', checkToken, archiveCarousel);

export default router;
