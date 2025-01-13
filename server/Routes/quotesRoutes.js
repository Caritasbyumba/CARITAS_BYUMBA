import express from 'express';
import {
  activateQuote,
  archiveQuote,
  createQuote,
  deleteQuote,
  getActiveQuotes,
  getAllQuotes,
  getSpecificQuote,
  updateQuote,
} from '../controllers/quoteController.js';
import checkQuotes from '../middlewares/checkQuotes.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.single('profile'),
  checkQuotes,
  createQuote
);
router.get('', getAllQuotes);
router.get('/active', getActiveQuotes);
router.get('/:itemId', getSpecificQuote);
router.patch(
  '/:itemId',
  checkToken,
  upload.single('profile'),
  checkQuotes,
  updateQuote
);
router.delete('/:itemId', checkToken, deleteQuote);
router.patch('/activate/:itemId', checkToken, activateQuote);
router.patch('/archive/:itemId', checkToken, archiveQuote);

export default router;
