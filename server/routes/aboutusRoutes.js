import express from 'express';
import {
  activateAboutus,
  archiveAboutus,
  createAboutus,
  deleteAboutus,
  getActiveAboutus,
  getAllAboutus,
  getSpecificAboutus,
  updateAboutus,
} from '../controllers/aboutusController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, createAboutus);
router.get('', getAllAboutus);
router.get('/active', getActiveAboutus);
router.get('/:itemId', getSpecificAboutus);
router.patch('/:itemId', checkToken, updateAboutus);
router.delete('/:itemId', checkToken, deleteAboutus);
router.patch('/activate/:itemId', checkToken, activateAboutus);
router.patch('/archive/:itemId', checkToken, archiveAboutus);

export default router;
