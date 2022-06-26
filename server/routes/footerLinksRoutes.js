import express from 'express';
import {
  activateFooterLink,
  archiveFooterLink,
  createFooterLink,
  deleteFooterLink,
  getActiveFooterLinks,
  getAllFooterLinks,
  getSpecificFooterLink,
  updateFooterLink,
} from '../controllers/footerLinksController.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/footerlinks/add', checkToken, createFooterLink);
router.get('/footerlinks', getAllFooterLinks);
router.get('/footerlinks/active', getActiveFooterLinks);
router.get('/footerlinks/:itemId', getSpecificFooterLink);
router.patch('/footerlinks/:itemId', checkToken, updateFooterLink);
router.delete('/footerlinks/:itemId', checkToken, deleteFooterLink);
router.patch('/footerlinks/activate/:itemId', checkToken, activateFooterLink);
router.patch('/footerlinks/archive/:itemId', checkToken, archiveFooterLink);

export default router;
