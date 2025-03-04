import express from 'express';
import {
  activatePublicationsIntro,
  archivePublicationsIntro,
  createPublicationsIntro,
  deletePublicationsIntro,
  getActivePublicationsIntros,
  getAllPublicationsIntros,
  getSpecificPublicationsIntro,
  updatePublicationsIntro,
} from '../controllers/publicationsController.js';
import checkIntro from '../middlewares/checkIntro.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkIntro, createPublicationsIntro);
router.get('', getAllPublicationsIntros);
router.get('/active', getActivePublicationsIntros);
router.get('/:itemId', getSpecificPublicationsIntro);
router.patch('/:itemId', checkToken, checkIntro, updatePublicationsIntro);
router.delete('/:itemId', checkToken, deletePublicationsIntro);
router.patch('/activate/:itemId', checkToken, activatePublicationsIntro);
router.patch('/archive/:itemId', checkToken, archivePublicationsIntro);

export default router;
