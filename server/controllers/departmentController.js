import { errorResponse, successResponse } from '../helpers/responses.js';
import Department from '../models/Department.js';

export const createDepartment = async (req, res) => {
  try {
    const {
      enName,
      frName,
      rwName,
      enDescription,
      frDescription,
      rwDescription,
      enObjectives,
      frObjectives,
      rwObjectives,
    } = req.body;
    const userId = req.tokenData._id;
    const newDepartment = new Department({
      name: { en: enName, fr: frName, rw: rwName },
      description: {
        en: enDescription,
        fr: frDescription,
        rw: rwDescription,
      },
      objectives: { en: enObjectives, fr: frObjectives, rw: rwObjectives },
      createdBy: userId,
      updatedBy: userId,
    });
    const department = await newDepartment.save();
    return successResponse(res, 201, 'Department created successfully', department);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find({})
      .populate(['createdBy', 'updatedBy'])
      .sort({ updatedAt: 'desc' });
    return successResponse(res, 200, 'Department retrieved successfully', department);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getActiveDepartment = async (req, res) => {
  try {
    const department = await Department.find({
      isActive: true,
    }).sort({ updatedAt: 'desc' });
    return successResponse(
      res,
      200,
      'Department retrieved successfully',
      department[0]
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSpecificDepartment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const departmentFound = await Department.findOne({ _id: itemId }).populate([
      'createdBy',
      'updatedBy',
    ]);
    if (!departmentFound) {
      return errorResponse(res, 404, 'Department not found');
    }
    return successResponse(
      res,
      200,
      'Department retrieved successfully',
      departmentFound
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const departmentFound = await Department.findOne({ _id: itemId });
    if (!departmentFound) {
      return errorResponse(res, 404, 'Department not found');
    }
    const {
      enName,
      frName,
      rwName,
      enDescription,
      frDescription,
      rwDescription,
      enObjectives,
      frObjectives,
      rwObjectives,
    } = req.body;
    const userId = req.tokenData._id;
    const department = await Department.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name: { en: enName, fr: frName, rw: rwName },
          description: {
            en: enDescription,
            fr: frDescription,
            rw: rwDescription,
          },
          objectives: { en: enObjectives, fr: frObjectives, rw: rwObjectives },
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Department edited successfully', department);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const departmentFound = await Department.findOne({ _id: itemId });
    if (!departmentFound) {
      return errorResponse(res, 404, 'Department not found');
    }
    await Department.deleteOne({ _id: itemId });
    return successResponse(res, 204);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const activateDepartment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const departmentFound = await Department.findOne({ _id: itemId });
    if (!departmentFound) {
      return errorResponse(res, 404, 'Department not found');
    }
    const userId = req.tokenData._id;
    const department = await Department.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: true,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Department edited successfully', department);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const archiveDepartment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const departmentFound = await Department.findOne({ _id: itemId });
    if (!departmentFound) {
      return errorResponse(res, 404, 'Department not found');
    }
    const userId = req.tokenData._id;
    const department = await Department.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          isActive: !departmentFound.isActive,
          updatedBy: userId,
        },
      },
      { new: true }
    ).populate(['createdBy', 'updatedBy']);
    return successResponse(res, 200, 'Department edited successfully', department);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
