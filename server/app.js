import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { errorResponse, successResponse } from './helpers/responses.js';
import userRoutes from './routes/userRoutes.js';
import carouselRoutes from './routes/carouselRoutes.js';

dotenv.config();
const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// access body request
app.use(bodyParser.json());
app.use(express.static('public'));

// DB Config
const db = process.env.DATABASE_URL_ATLAS;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => {
    return app.use((req, res) =>
      errorResponse(res, 500, 'Something went wrong! Plase try again...')
    );
  });

app.get('/api/', (req, res) =>
  successResponse(res, 200, 'WELCOME TO CARITAS BYUMBA WEBSITE BACKEND')
);
app.use('/api/', userRoutes);
app.use('/api/', carouselRoutes);

app.use((req, res) => errorResponse(res, 400, 'The route was not found'));

export default app;
