import express from 'express';
import {
  addMessage,
  filterMessages,
  getAllMessages,
  replyMessage,
} from '../controllers/messageControllers.js';
import checkMessage from '../middlewares/checkMessage.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/send', checkMessage, addMessage);
router.get('', checkToken, getAllMessages);
router.get('/:filter', checkToken, filterMessages);
router.patch('/:messageId', checkToken, replyMessage);

export default router;
