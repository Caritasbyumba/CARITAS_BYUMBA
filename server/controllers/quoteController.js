import fs from 'fs';

import { errorResponse, successResponse } from '../helpers/responses.js';
import Quote from '../models/Quote.js';

export const createQuote = async (req, res) => {
  try {
    const { name, role, quote } = req.body;
    const userId = req.tokenData._id;
    const newQuote = new Quote({
      name: name,
      role: { en: role.en, fr: role.fr, rw: role.rw },
      quote: { en: quote.en, fr: quote.fr, rw: quote.rw },
      profile: req.file.filename,
      createdBy: userId,
      updatedBy: userId,
    });
    const createdQuote = await newQuote.save();
    return successResponse(
      res,
      201,
      'Quote created successfully',
      createdQuote
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({})
      .populate(['createdBy', 'updatedBy'])
      .sort({ updatedAt: 'desc' });
    return successResponse(res, 200, 'Quotes retrieved successfully', quotes);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActiveQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({
      isActive: true,
    }).sort({ updatedAt: 'desc' });
    return successResponse(res, 200, 'Quotes retrieved successfully', quotes);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const quoteFound = await Quote.findOne({ _id: itemId }).populate([
      'createdBy',
      'updatedBy',
    ]);
    if (!quoteFound) {
      return errorResponse(res, 404, 'Quote not found');
    }
    return successResponse(
      res,
      200,
      'Quote retrieved successfully',
      quoteFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const carouselFound = await Carousel.findOne({ _id: itemId });
    if (!carouselFound) {
      return errorResponse(res, 404, 'Carousel not found');
    }
    const { name, role, quote } = req.body;
    const userId = req.tokenData._id;
    const updatedQuote = await Quote.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name: name,
          role: { en: role.en, fr: role.fr, rw: role.rw },
          quote: { en: quote.en, fr: quote.fr, rw: quote.rw },
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Quote edited successfully', updatedQuote);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { itemId } = req.params;
    const quoteFound = await Quote.findOne({ _id: itemId });
    if (!quoteFound) {
      return errorResponse(res, 404, 'Quote not found');
    }
    await Quote.deleteOne({ _id: itemId });
    fs.unlinkSync(`public/images/${quoteFound.image}`);
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateQuote = async (req, res) => {
  try {
    const { itemId } = req.params;
    const quoteFound = await Quote.findOne({ _id: itemId });
    if (!quoteFound) {
      return errorResponse(res, 404, 'Quote not found');
    }
    const userId = req.tokenData._id;
    const quote = await Quote.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Quote edited successfully', quote);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveQuote = async (req, res) => {
  try {
    const { itemId } = req.params;
    const quoteFound = await Quote.findOne({ _id: itemId });
    if (!quoteFound) {
      return errorResponse(res, 404, 'Quote not found');
    }
    const userId = req.tokenData._id;
    const quote = await Quote.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: false,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Quote edited successfully', quote);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
