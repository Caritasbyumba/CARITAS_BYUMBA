import express from 'express';
import {
  activateDonationArea,
  archiveDonationArea,
  createDonationArea,
  deleteDonationArea,
  getActiveDonationAreas,
  getAllDonationAreas,
  getSpecificDonationArea,
  updateDonationArea,
} from '../controllers/donateController.js';
import checkDonationAreas from '../middlewares/checkDonationAreas.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkDonationAreas, createDonationArea);
router.get('', getAllDonationAreas);
router.get('/active', getActiveDonationAreas);
router.get('/:itemId', getSpecificDonationArea);
router.patch('/:itemId', checkToken, checkDonationAreas, updateDonationArea);
router.delete('/:itemId', checkToken, deleteDonationArea);
router.patch('/activate/:itemId', checkToken, activateDonationArea);
router.patch('/archive/:itemId', checkToken, archiveDonationArea);

export default router;
