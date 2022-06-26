import express from 'express';
import {
  activateMoreonus,
  archiveMoreonus,
  createMoreonus,
  deleteMoreonus,
  getactiveMoreonus,
  getAllMoreOnUs,
  getSpecificMoreonus,
  updateMoreonus,
} from '../controllers/moreonusController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/moreonus/add', checkToken, createMoreonus);
router.get('/moreonus', getAllMoreOnUs);
router.get('/moreonus/active', getactiveMoreonus);
router.get('/moreonus/:itemId', getSpecificMoreonus);
router.patch('/moreonus/:itemId', checkToken, updateMoreonus);
router.delete('/moreonus/:itemId', checkToken, deleteMoreonus);
router.patch('/moreonus/activate/:itemId', checkToken, activateMoreonus);
router.patch('/moreonus/archive/:itemId', checkToken, archiveMoreonus);

export default router;
