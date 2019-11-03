import mongoose from 'mongoose';
import validator from 'validator';
import { Location } from './location.model';
import { TrackerSession } from '../trackerSession/trackerSession.model';

export const setLocationForTrackerSession = async (req, res, next) => {
  try {
    const latitude = req.body.latitude || '';
    const longitude = req.body.longitude || '';
    const trackerSessionId = req.body.trackerSessionId;

    if (
      !validator.isLatLong(`${latitude.toString()}, ${longitude.toString()}`) ||
      !mongoose.Types.ObjectId.isValid(trackerSessionId)
    ) {
      return res.status(401).send({
        message: 'Wrong tracker session id or invalid geographic coordinates',
      });
    }

    const activeTrackerSession = await TrackerSession.findById(trackerSessionId)
      .lean()
      .exec();

    if (!activeTrackerSession || !activeTrackerSession.isActive) {
      return res.status(403).send({ message: 'You need to login' });
    }

    const location = await Location.create({
      type: 'Point',
      coordinates: [latitude, longitude],
    });

    const trackerSession = await TrackerSession.findByIdAndUpdate(
      trackerSessionId,
      {
        $push: {
          locationIds: location._id,
        },
      },
      { new: true }
    )
      .select('-__v')
      .lean()
      .exec();

    return res.status(200).send(trackerSession);
  } catch (e) {
    return res.status(500).end();
  }
};

export const showLocationsWithTrackerSession = async (req, res, next) => {
  try {
    const driverId = req.query.driverId;

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(401).send({ message: 'Wrong input of driver ID' });
    }

    const activeSessions = await TrackerSession.find(
      {
        driverId,
        isActive: true,
      },
      { locationIds: true }
    )
      .populate('locationIds', { __v: false, type: false })
      .lean()
      .exec();

    return res.status(200).send(activeSessions);
  } catch (e) {
    return res.status(500).end();
  }
};
