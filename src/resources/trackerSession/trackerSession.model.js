import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  { timestamps: true }
);

export const TrackerSession = mongoose.model(
  'TrackerSession',
  trackerSessionSchema
);
