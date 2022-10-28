import express from 'express';
import {
  activateAdvertsIntro,
  archiveAdvertsIntro,
  createAdvertsIntro,
  deleteAdvertsIntro,
  getActiveAdvertsIntros,
  getAllAdvertsIntros,
  getSpecificAdvertsIntro,
  updateAdvertsIntro,
} from '../controllers/advertsController.js';
import checkIntro from '../middlewares/checkIntro.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkIntro, createAdvertsIntro);
router.get('', getAllAdvertsIntros);
router.get('/active', getActiveAdvertsIntros);
router.get('/:itemId', getSpecificAdvertsIntro);
router.patch('/:itemId', checkToken, checkIntro, updateAdvertsIntro);
router.delete('/:itemId', checkToken, deleteAdvertsIntro);
router.patch('/activate/:itemId', checkToken, activateAdvertsIntro);
router.patch('/archive/:itemId', checkToken, archiveAdvertsIntro);

export default router;
