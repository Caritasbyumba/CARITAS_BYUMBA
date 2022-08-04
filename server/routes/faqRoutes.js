import express from 'express';
import {
  activateFaq,
  archiveFaq,
  createFaq,
  deleteFaq,
  getActiveFaqs,
  getAllFaqs,
  getSpecificFaq,
  updateFaq,
} from '../controllers/faqController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, createFaq);
router.get('', getAllFaqs);
router.get('/active', getActiveFaqs);
router.get('/:itemId', getSpecificFaq);
router.patch('/:itemId', checkToken, updateFaq);
router.delete('/:itemId', checkToken, deleteFaq);
router.patch('/activate/:itemId', checkToken, activateFaq);
router.patch('/archive/:itemId', checkToken, archiveFaq);

export default router;
