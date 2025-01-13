import express from 'express';
import {
  activateChart,
  archiveChart,
  createChart,
  deleteChart,
  getActiveCharts,
  getAllCharts,
  getSpecificChart,
  updateChart,
} from '../controllers/chartController.js';
import checkChart from '../middlewares/checkChart.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/uplaod.js';

const router = express.Router();

router.post(
  '/add',
  checkToken,
  upload.single('image'),
  checkChart,
  createChart
);
router.get('', checkToken, getAllCharts);
router.get('/active', getActiveCharts);
router.get('/:itemId', checkToken, getSpecificChart);
router.patch(
  '/:itemId',
  checkToken,
  upload.single('image'),
  checkChart,
  updateChart
);
router.delete('/:itemId', checkToken, deleteChart);
router.patch('/activate/:itemId', checkToken, activateChart);
router.patch('/archive/:itemId', checkToken, archiveChart);

export default router;
