import express from 'express';
import {
  activatePartnersIntro,
  archivePartnersIntro,
  createPartnersIntro,
  deletePartnersIntro,
  getActivePartnersIntros,
  getAllPartnersIntros,
  getSpecificPartnersIntro,
  updatePartnersIntro,
} from '../controllers/partnerscontroller.js';
import checkIntro from '../middlewares/checkIntro.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkIntro, createPartnersIntro);
router.get('', getAllPartnersIntros);
router.get('/active', getActivePartnersIntros);
router.get('/:itemId', getSpecificPartnersIntro);
router.patch('/:itemId', checkToken, checkIntro, updatePartnersIntro);
router.delete('/:itemId', checkToken, deletePartnersIntro);
router.patch('/activate/:itemId', checkToken, activatePartnersIntro);
router.patch('/archive/:itemId', checkToken, archivePartnersIntro);

export default router;
