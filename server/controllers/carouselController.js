import fs from 'fs';

import { errorResponse, successResponse } from '../helpers/responses.js';
import Carousel from '../models/Carousel.js';

export const createCarousel = async (req, res) => {
  try {
    const {
      enTitle,
      frTitle,
      rwTitle,
      enDescription,
      frDescription,
      rwDescription,
    } = req.body;
    const userId = req.tokenData._id;
    const newCarousel = new Carousel({
      title: { en: enTitle, fr: frTitle, rw: rwTitle },
      description: {
        en: enDescription,
        fr: frDescription,
        rw: rwDescription,
      },
      image: req.file.filename,
      createdBy: userId,
      updatedBy: userId,
    });
    const carousel = await newCarousel.save();
    return successResponse(res, 201, 'Carousel created successfully', carousel);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find({})
      .populate(['createdBy', 'updatedBy'])
      .sort({ updatedAt: 'desc' });
    return successResponse(
      res,
      200,
      'Carousels retrieved successfully',
      carousels
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActiveCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find({
      isActive: true,
    }).sort({ updatedAt: 'desc' });
    return successResponse(
      res,
      200,
      'Carousels retrieved successfully',
      carousels
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const carouselFound = await Carousel.findOne({ _id: itemId }).populate([
      'createdBy',
      'updatedBy',
    ]);
    if (!carouselFound) {
      return errorResponse(res, 404, 'Carousel not found');
    }
    return successResponse(
      res,
      200,
      'Carousel retrieved successfully',
      carouselFound
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
    const {
      enTitle,
      frTitle,
      rwTitle,
      enDescription,
      frDescription,
      rwDescription,
    } = req.body;
    const userId = req.tokenData._id;
    let carousel;
    if (req.file?.filename) {
      fs.unlinkSync(`public/images/${carouselFound.image}`);
      carousel = await Carousel.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            title: { en: enTitle, fr: frTitle, rw: rwTitle },
            description: {
              en: enDescription,
              fr: frDescription,
              rw: rwDescription,
            },
            image: req.file.filename,
            updatedBy: userId,
          },
        },
        { new: true }
      ).populate(['createdBy', 'updatedBy']);
    } else {
      carousel = await Carousel.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            title: { en: enTitle, fr: frTitle, rw: rwTitle },
            description: {
              en: enDescription,
              fr: frDescription,
              rw: rwDescription,
            },
            updatedBy: userId,
          },
        },
        { new: true }
      ).populate(['createdBy', 'updatedBy']);
    }
    return successResponse(res, 200, 'Carousel edited successfully', carousel);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const carouselFound = await Carousel.findOne({ _id: itemId });
    if (!carouselFound) {
      return errorResponse(res, 404, 'Carousel not found');
    }
    await Carousel.deleteOne({ _id: itemId });
    fs.unlinkSync(`public/images/${carouselFound.image}`);
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const carouselFound = await Carousel.findOne({ _id: itemId });
    if (!carouselFound) {
      return errorResponse(res, 404, 'Carousel not found');
    }
    const userId = req.tokenData._id;
    const carousel = await Carousel.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Carousel edited successfully', carousel);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveCarousel = async (req, res) => {
  try {
    const { itemId } = req.params;
    const carouselFound = await Carousel.findOne({ _id: itemId });
    if (!carouselFound) {
      return errorResponse(res, 404, 'Carousel not found');
    }
    const userId = req.tokenData._id;
    const carousel = await Carousel.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: !carouselFound.isActive,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Carousel edited successfully', carousel);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
