import express from 'express';
import {
  activateProjectsIntro,
  archiveProjectsIntro,
  createProjectsIntro,
  deleteProjectsIntro,
  getActiveProjectsIntros,
  getAllProjectsIntros,
  getSpecificProjectsIntro,
  updateProjectsIntro,
} from '../controllers/projectSController.js';
import checkIntro from '../middlewares/checkIntro.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/add', checkToken, checkIntro, createProjectsIntro);
router.get('', getAllProjectsIntros);
router.get('/active', getActiveProjectsIntros);
router.get('/:itemId', getSpecificProjectsIntro);
router.patch('/:itemId', checkToken, checkIntro, updateProjectsIntro);
router.delete('/:itemId', checkToken, deleteProjectsIntro);
router.patch('/activate/:itemId', checkToken, activateProjectsIntro);
router.patch('/archive/:itemId', checkToken, archiveProjectsIntro);

export default router;
