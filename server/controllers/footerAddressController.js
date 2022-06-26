import { errorResponse, successResponse } from '../helpers/responses.js';
import FooterAddress from '../models/FooterAddress.js';

export const createFooterAddress = async (req, res) => {
  try {
    const { name, value, type } = req.body;
    const userId = req.tokenData._id;
    const newFooterAddress = new FooterAddress({
      name: name,
      value: value,
      type: type,
      createdBy: userId,
      updatedBy: userId,
    });
    const footerAddress = await newFooterAddress.save();
    return successResponse(
      res,
      201,
      'Footer address created successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllFooterAddress = async (req, res) => {
  try {
    const footerAddress = await FooterAddress.find({});
    return successResponse(
      res,
      200,
      'Footer address retrieved successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActiveFooterAddress = async (req, res) => {
  try {
    const footerAddress = await FooterAddress.find({
      isActive: true,
    });
    return successResponse(
      res,
      200,
      'Footer address retrieved successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificFooterAddress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const footerAddressFound = await FooterAddress.findOne({ _id: itemId });
    if (!footerAddressFound) {
      return errorResponse(res, 404, 'Footer address not found');
    }
    return successResponse(
      res,
      200,
      'Footer address retrieved successfully',
      footerAddressFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateFooterAddress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const footerAddressFound = await FooterAddress.findOne({ _id: itemId });
    if (!footerAddressFound) {
      return errorResponse(res, 404, 'Footer address not found');
    }
    const { name, value, type } = req.body;
    const userId = req.tokenData._id;
    const footerAddress = await FooterAddress.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name: name,
          value: value,
          type: type,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(
      res,
      200,
      'Footer address edited successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteFooterAddress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const footerAddressFound = await FooterAddress.findOne({ _id: itemId });
    if (!footerAddressFound) {
      return errorResponse(res, 404, 'Footer address not found');
    }
    await FooterAddress.deleteOne({ _id: itemId });
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateFooterAddress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const FooterAddressFound = await FooterAddress.findOne({ _id: itemId });
    if (!FooterAddressFound) {
      return errorResponse(res, 404, 'Footer address not found');
    }
    const userId = req.tokenData._id;
    const footerAddress = await FooterAddress.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(
      res,
      200,
      'Footer address edited successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveFooterAddress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const footerAddressFound = await FooterAddress.findOne({ _id: itemId });
    if (!footerAddressFound) {
      return errorResponse(res, 404, 'Footer address not found');
    }
    const userId = req.tokenData._id;
    const footerAddress = await FooterAddress.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: false,
          updatedBy: userId,
        },
      },
      { new: true }
    );
    return successResponse(
      res,
      200,
      'Footer address edited successfully',
      footerAddress
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
