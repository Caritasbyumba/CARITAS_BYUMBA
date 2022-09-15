import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { errorResponse, successResponse } from './helpers/responses.js';
import userRoutes from './routes/userRoutes.js';
import carouselRoutes from './routes/carouselRoutes.js';
import moreonusRoutes from './routes/moreonusRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import footerLinksRoutes from './routes/footerLinksRoutes.js';
import footerAddressRoutes from './routes/footerAddressRoutes.js';
import aboutusRoutes from './routes/aboutusRoutes.js';
import quotesRoutes from './routes/quotesRoutes.js';
import partnersRoutes from './routes/partnersRoutes.js';
import projectsIntroRoutes from './routes/projectsIntroRoutes.js';
import partnersIntroRoutes from './routes/partnersIntroRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import publicationsRoutes from './routes/publicationsRoutes.js';
import publicationsIntroRoutes from './routes/publicationsIntroRoutes.js';
import donateIntroRoutes from './routes/donateIntroRoutes.js';
import donationAreasRoutes from './routes/donationAreasRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

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
app.use('/api/users/', userRoutes);
app.use('/api/carousels/', carouselRoutes);
app.use('/api/moreonus/', moreonusRoutes);
app.use('/api/projects/', projectsRoutes);
app.use('/api/footerlinks/', footerLinksRoutes);
app.use('/api/footeraddress/', footerAddressRoutes);
app.use('/api/aboutus/', aboutusRoutes);
app.use('/api/quotes/', quotesRoutes);
app.use('/api/partners/', partnersRoutes);
app.use('/api/projectsintro/', projectsIntroRoutes);
app.use('/api/partnersintro/', partnersIntroRoutes);
app.use('/api/messages/', messageRoutes);
app.use('/api/faqs/', faqRoutes);
app.use('/api/publications/', publicationsRoutes);
app.use('/api/publicationsintro/', publicationsIntroRoutes);
app.use('/api/donateintro/', donateIntroRoutes);
app.use('/api/donationareas/', donationAreasRoutes);
app.use('/api/donation/', donationRoutes);
app.use('/api/departments/', departmentRoutes);
app.use('/api/services/', serviceRoutes);

app.use((req, res) => errorResponse(res, 400, 'The route was not found'));

export default app;
