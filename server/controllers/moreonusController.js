import { errorResponse, successResponse } from '../helpers/responses.js';
import Moreonus from '../models/Moreonus.js';

export const createMoreonus = async (req, res) => {
  try {
    const { description, callToActionBtn, callToActionLink } = req.body;
    const userId = req.tokenData._id;
    const newMoreonus = new Moreonus({
      description: description,
      callToActionBtn: callToActionBtn,
      callToActionLink: callToActionLink,
      createdBy: userId,
      updatedBy: userId,
    });
    const moreonus = await newMoreonus.save();
    return successResponse(res, 201, 'Moreonus created successfully', moreonus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllMoreOnUs = async (req, res) => {
  try {
    const moreonus = await Moreonus.find({});
    return successResponse(
      res,
      200,
      'All moreonus retrieved successfully',
      moreonus
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getactiveMoreonus = async (req, res) => {
  try {
    const moreonus = await Moreonus.find({
      isActive: true,
    })
      .sort({ updatedAt: 'desc' })
      .limit(1);
    return successResponse(
      res,
      200,
      'Moreonus retrieved successfully',
      moreonus
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificMoreonus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const moreonusFound = await Moreonus.findOne({ _id: itemId });
    if (!moreonusFound) {
      return errorResponse(res, 404, 'Moreonus not found');
    }
    return successResponse(
      res,
      200,
      'Moreonus retrieved successfully',
      moreonusFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateMoreonus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const moreonusFound = await Moreonus.findOne({ _id: itemId });
    if (!moreonusFound) {
      return errorResponse(res, 404, 'Moreonus not found');
    }
    const { description, callToActionBtn, callToActionLink } = req.body;
    const userId = req.tokenData._id;
    const moreonus = await Moreonus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          description: description,
          callToActionBtn: callToActionBtn,
          callToActionLink: callToActionLink,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(res, 200, 'Moreonus edited successfully', moreonus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteMoreonus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const moreonusFound = await Moreonus.findOne({ _id: itemId });
    if (!moreonusFound) {
      return errorResponse(res, 404, 'Moreonus not found');
    }
    await Moreonus.deleteOne({ _id: itemId });
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateMoreonus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const moreonusFound = await Moreonus.findOne({ _id: itemId });
    if (!moreonusFound) {
      return errorResponse(res, 404, 'Moreonus not found');
    }
    const userId = req.tokenData._id;
    const moreonus = await Moreonus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(res, 200, 'Moreonus edited successfully', moreonus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveMoreonus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const moreonusFound = await Moreonus.findOne({ _id: itemId });
    if (!moreonusFound) {
      return errorResponse(res, 404, 'Moreonus not found');
    }
    const userId = req.tokenData._id;
    const moreonus = await Moreonus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: false,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(res, 200, 'Moreonus edited successfully', moreonus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
