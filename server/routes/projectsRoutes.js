import express from 'express';
import {
  activateProject,
  archiveProject,
  createProject,
  deleteProject,
  getActiveProjects,
  getAllProjects,
  getSpecificProject,
  updateProject,
} from '../controllers/projectSController.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post('/projects/add', checkToken, upload.array('images'), createProject);
router.get('/projects', getAllProjects);
router.get('/projects/active', getActiveProjects);
router.get('/projects/:itemId', getSpecificProject);
router.patch(
  '/projects/:itemId',
  checkToken,
  upload.array('images'),
  updateProject
);
router.delete('/projects/:itemId', checkToken, deleteProject);
router.patch('/projects/activate/:itemId', checkToken, activateProject);
router.patch('/projects/archive/:itemId', checkToken, archiveProject);

export default router;
