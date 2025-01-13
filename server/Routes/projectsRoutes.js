import express from 'express';
import {
  activateProject,
  archiveProject,
  createProject,
  deleteProject,
  getActiveMainProjects,
  getActiveProjects,
  getAllProjects,
  getSpecificProject,
  updateProject,
} from '../controllers/projectSController.js';
import checkProject from '../middlewares/checkProject.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.array('images'),
  checkProject,
  createProject
);
router.get('', getAllProjects);
router.get('/active', getActiveProjects);
router.get('/main', getActiveMainProjects);
router.get('/:itemId', getSpecificProject);
router.patch(
  '/:itemId',
  checkToken,
  upload.array('images'),
  checkProject,
  updateProject
);
router.delete('/:itemId', checkToken, deleteProject);
router.patch('/activate/:itemId', checkToken, activateProject);
router.patch('/archive/:itemId', checkToken, archiveProject);

export default router;
