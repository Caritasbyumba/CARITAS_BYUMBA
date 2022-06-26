import express from 'express';
import { addUser, login } from '../controllers/usersController.js';

const router = express.Router();

router.post('/users/add', addUser);
router.post('/users/login', login);

export default router;
