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

router.post('/add', checkToken, createMoreonus);
router.get('', getAllMoreOnUs);
router.get('/active', getactiveMoreonus);
router.get('/:itemId', getSpecificMoreonus);
router.patch('/:itemId', checkToken, updateMoreonus);
router.delete('/:itemId', checkToken, deleteMoreonus);
router.patch('/activate/:itemId', checkToken, activateMoreonus);
router.patch('/archive/:itemId', checkToken, archiveMoreonus);

export default router;
