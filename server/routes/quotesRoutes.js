import express from 'express';
import {
  activateAboutus,
  archiveAboutus,
  deleteAboutus,
  getSpecificAboutus,
  updateAboutus,
} from '../controllers/aboutusController.js';
import {
  createQuote,
  getActiveQuotes,
  getAllQuotes,
} from '../controllers/quoteController.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post('/quotes/add', checkToken, upload.single('image'), createQuote);
router.get('/quotes', getAllQuotes);
router.get('/quotes/active', getActiveQuotes);
router.get('/quotes/:itemId', getSpecificAboutus);
router.patch('/quotes/:itemId', checkToken, updateAboutus);
router.delete('/quotes/:itemId', checkToken, deleteAboutus);
router.patch('/quotes/activate/:itemId', checkToken, activateAboutus);
router.patch('/quotes/archive/:itemId', checkToken, archiveAboutus);

export default router;
