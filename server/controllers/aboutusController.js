import { errorResponse, successResponse } from '../helpers/responses.js';
import Aboutus from '../models/Aboutus.js';

export const createAboutus = async (req, res) => {
  try {
    const { name, description, vision, mission, objectives } = req.body;
    const userId = req.tokenData._id;
    const newAboutus = new Aboutus({
      name: { en: name.en, fr: name.fr, rw: name.rw },
      description: {
        en: description.en,
        fr: description.fr,
        rw: description.rw,
      },
      vision: { en: vision.en, fr: vision.fr, rw: vision.rw },
      mission: { en: mission.en, fr: mission.fr, rw: mission.rw },
      objectives: { en: objectives.en, fr: objectives.fr, rw: objectives.rw },
      createdBy: userId,
      updatedBy: userId,
    });
    const aboutus = await newAboutus.save();
    return successResponse(res, 201, 'Aboutus created successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllAboutus = async (req, res) => {
  try {
    const aboutus = await Aboutus.find({})
      .populate(['createdBy', 'updatedBy'])
      .sort({ updatedAt: 'desc' });
    return successResponse(res, 200, 'Aboutus retrieved successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActiveAboutus = async (req, res) => {
  try {
    const aboutus = await Aboutus.find({
      isActive: true,
    }).sort({ updatedAt: 'desc' });
    return successResponse(res, 200, 'Aboutus retrieved successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificAboutus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const aboutusFound = await Aboutus.findOne({ _id: itemId }).populate([
      'createdBy',
      'updatedBy',
    ]);
    if (!aboutusFound) {
      return errorResponse(res, 404, 'Aboutus not found');
    }
    return successResponse(
      res,
      200,
      'Aboutus retrieved successfully',
      aboutusFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateAboutus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const aboutusFound = await Aboutus.findOne({ _id: itemId });
    if (!aboutusFound) {
      return errorResponse(res, 404, 'Aboutus not found');
    }
    const { name, description, vision, mission, objectives } = req.body;
    const userId = req.tokenData._id;
    const aboutus = await Aboutus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name: { en: name.en, fr: name.fr, rw: name.rw },
          description: {
            en: description.en,
            fr: description.fr,
            rw: description.rw,
          },
          vision: { en: vision.en, fr: vision.fr, rw: vision.rw },
          mission: { en: mission.en, fr: mission.fr, rw: mission.rw },
          objectives: {
            en: objectives.en,
            fr: objectives.fr,
            rw: objectives.rw,
          },
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Aboutus edited successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteAboutus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const aboutusFound = await Aboutus.findOne({ _id: itemId });
    if (!aboutusFound) {
      return errorResponse(res, 404, 'Aboutus not found');
    }
    await Aboutus.deleteOne({ _id: itemId });
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateAboutus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const aboutusFound = await Aboutus.findOne({ _id: itemId });
    if (!aboutusFound) {
      return errorResponse(res, 404, 'Aboutus not found');
    }
    const userId = req.tokenData._id;
    const aboutus = await Aboutus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Aboutus edited successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveAboutus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const aboutusFound = await Aboutus.findOne({ _id: itemId });
    if (!aboutusFound) {
      return errorResponse(res, 404, 'Aboutus not found');
    }
    const userId = req.tokenData._id;
    const aboutus = await Aboutus.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: false,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Aboutus edited successfully', aboutus);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
