import express from 'express';
import {
  activateFooterAddress,
  archiveFooterAddress,
  createFooterAddress,
  deleteFooterAddress,
  getActiveFooterAddress,
  getAllFooterAddress,
  getSpecificFooterAddress,
  updateFooterAddress,
} from '../controllers/footerAddressController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/footeraddress/add', checkToken, createFooterAddress);
router.get('/footeraddress', getAllFooterAddress);
router.get('/footeraddress/active', getActiveFooterAddress);
router.get('/footeraddress/:itemId', getSpecificFooterAddress);
router.patch('/footeraddress/:itemId', checkToken, updateFooterAddress);
router.delete('/footeraddress/:itemId', checkToken, deleteFooterAddress);
router.patch(
  '/footeraddress/activate/:itemId',
  checkToken,
  activateFooterAddress
);
router.patch(
  '/footeraddress/archive/:itemId',
  checkToken,
  archiveFooterAddress
);

export default router;
