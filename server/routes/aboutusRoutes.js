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

router.post('/aboutus/add', checkToken, createAboutus);
router.get('/aboutus', getAllAboutus);
router.get('/aboutus/active', getActiveAboutus);
router.get('/aboutus/:itemId', getSpecificAboutus);
router.patch('/aboutus/:itemId', checkToken, updateAboutus);
router.delete('/aboutus/:itemId', checkToken, deleteAboutus);
router.patch('/aboutus/activate/:itemId', checkToken, activateAboutus);
router.patch('/aboutus/archive/:itemId', checkToken, archiveAboutus);

export default router;
