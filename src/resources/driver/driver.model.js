import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Driver = mongoose.model('Driver', driverSchema);
