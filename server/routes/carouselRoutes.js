import express from 'express';
import {
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
router.get('/carousels', getAllCarousels);
router.get('/carousels/active', getActiveCarousels);
router.get('/carousels/:itemId', getSpecificCarousel);
router.patch('/carousels/:itemId', checkToken, updateCarousel);
router.delete('/carousels/:itemId', checkToken, deleteCarousel);

export default router;
