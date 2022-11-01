import express from 'express';
import {
  activateDonationMessage,
  archiveDonationMessage,
  createDonationMessage,
  deleteDonationMessage,
  getactiveDonationMessage,
  getAllMoreOnUs,
  getSpecificDonationMessage,
  updateDonationMessage,
} from '../controllers/donationMessageController.js';
import checkDonationMessage from '../middlewares/checkDonationMessage.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkDonationMessage, createDonationMessage);
router.get('', getAllMoreOnUs);
router.get('/active', getactiveDonationMessage);
router.get('/:itemId', getSpecificDonationMessage);
router.patch('/:itemId', checkToken, checkDonationMessage, updateDonationMessage);
router.delete('/:itemId', checkToken, deleteDonationMessage);
router.patch('/activate/:itemId', checkToken, activateDonationMessage);
router.patch('/archive/:itemId', checkToken, archiveDonationMessage);

export default router;
