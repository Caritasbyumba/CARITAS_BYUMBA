import { errorResponse, successResponse } from '../helpers/responses.js';
import Donation from '../models/Donation.js';

export const makeDonation = async (req, res) => {
  try {
    const { name, email, chosenArea, transactionReference, amount, currency } =
      req.body;
    const newDonation = new Donation({
      name: name,
      email: email,
      transactionReference: transactionReference,
      amount: amount,
      currency: currency,
      donationArea: chosenArea,
    });
    const donation = await (await newDonation.save()).populate('donationArea');
    return successResponse(res, 200, 'Donation made successfully', donation);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
