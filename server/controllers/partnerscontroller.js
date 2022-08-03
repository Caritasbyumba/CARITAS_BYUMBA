import fs from 'fs';
import { errorResponse, successResponse } from '../helpers/responses.js';
import Partner from '../models/Partner.js';

export const createPartner = async (req, res) => {
  try {
    const {
      name,
      enDescription,
      frDescription,
      rwDescription,
      enQuote,
      frQuote,
      rwQuote,
    } = req.body;
    const userId = req.tokenData._id;
    const newPartner = new Partner({
      name: name,
      quote: {
        en: enQuote,
        fr: frQuote,
        rw: rwQuote,
      },
      description: {
        en: enDescription,
        fr: frDescription,
        rw: rwDescription,
      },
      image: req.file.filename,
      createdBy: userId,
      updatedBy: userId,
    });
    const partner = await newPartner.save();
    return successResponse(res, 201, 'Partner created successfully', partner);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find({})
      .populate(['createdBy', 'updatedBy'])
      .sort({ updatedAt: 'desc' });
    return successResponse(
      res,
      200,
      'Partners retrieved successfully',
      partners
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActivePartners = async (req, res) => {
  try {
    const partners = await Partner.find({
      isActive: true,
    }).sort({ updatedAt: 'desc' });
    return successResponse(
      res,
      200,
      'Partners retrieved successfully',
      partners
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificPartner = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partnerFound = await Partner.findOne({ _id: itemId }).populate([
      'createdBy',
      'updatedBy',
    ]);
    if (!partnerFound) {
      return errorResponse(res, 404, 'Partner not found');
    }
    return successResponse(
      res,
      200,
      'Partner retrieved successfully',
      partnerFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partnerFound = await Partner.findOne({ _id: itemId });
    if (!partnerFound) {
      return errorResponse(res, 404, 'Partner not found');
    }
    const {
      name,
      enQuote,
      frQuote,
      rwQuote,
      enDescription,
      frDescription,
      rwDescription,
    } = req.body;
    const userId = req.tokenData._id;
    partnerFound.gallery.forEach((image) => {
      fs.unlinkSync(`public/images/${image}`);
    });
    const partner = await Partner.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name: name,
          quote: {
            en: enQuote,
            fr: frQuote,
            rw: rwQuote,
          },
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
    return successResponse(res, 200, 'Partner edieted successfully', partner);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partnerFound = await Partner.findOne({ _id: itemId });
    if (!partnerFound) {
      return errorResponse(res, 404, 'Partner not found');
    }
    await Partner.deleteOne({ _id: itemId });
    partnerFound.gallery.forEach((image) => {
      fs.unlinkSync(`public/images/${image}`);
    });
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activatePartner = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partnerFound = await Partner.findOne({ _id: itemId });
    if (!partnerFound) {
      return errorResponse(res, 404, 'Partner not found');
    }
    const userId = req.tokenData._id;
    const partner = await Partner.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Partner edited successfully', partner);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archivePartner = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partnerFound = await Partner.findOne({ _id: itemId });
    if (!partnerFound) {
      return errorResponse(res, 404, 'Partner not found');
    }
    const userId = req.tokenData._id;
    const partner = await Partner.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: false,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Partner edited successfully', partner);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
