import express from 'express';
import { makeDonation } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/add', makeDonation);

export default router;