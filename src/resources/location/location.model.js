import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export const Location = mongoose.model('Location', locationSchema);
