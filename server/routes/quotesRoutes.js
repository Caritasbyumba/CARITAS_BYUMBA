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

router.post('/add', checkToken, upload.single('profile'), createQuote);
router.get('', getAllQuotes);
router.get('/active', getActiveQuotes);
router.get('/:itemId', getSpecificAboutus);
router.patch('/:itemId', checkToken, updateAboutus);
router.delete('/:itemId', checkToken, deleteAboutus);
router.patch('/activate/:itemId', checkToken, activateAboutus);
router.patch('/archive/:itemId', checkToken, archiveAboutus);

export default router;
