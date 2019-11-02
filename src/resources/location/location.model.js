import mongoose from 'mongoose';

const reshapingOptions = {
  // exclude .__v
  versionKey: false,
};

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
  { timestamps: true, toJSON: reshapingOptions }
);

export const Location = mongoose.model('Location', locationSchema);
