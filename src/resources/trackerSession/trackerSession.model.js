import mongoose from 'mongoose';

const { Schema } = mongoose;

const reshapingOptions = {
  // exclude .__v
  versionKey: false,
};

const trackerSessionSchema = new mongoose.Schema(
  {
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
    },

    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },

    locationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Location',
      },
    ],
  },
  { timestamps: true, toJSON: reshapingOptions }
);

export const TrackerSession = mongoose.model(
  'TrackerSession',
  trackerSessionSchema
);
