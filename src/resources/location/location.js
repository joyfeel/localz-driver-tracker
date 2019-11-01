import validator from 'validator';
import { Driver } from '../driver/driver.model';
import { Location } from './location.model';
import { TrackerSession } from '../trackerSession/trackerSession.model';

export const setLocationForTrackerSession = async (req, res, next) => {
  try {
    const email = req.body.email || '';
    const latitude = req.body.latitude || '';
    const longitude = req.body.longitude || '';

    if (
      !validator.isEmail(email) ||
      !validator.isLatLong(`${latitude.toString()}, ${longitude.toString()}`)
    ) {
      return res
        .status(401)
        .send({ message: 'Wrong email or not a valid geographic coordinate' });
    }

    const driver = await Driver.findOne({
      email,
    })
      .lean()
      .exec();

    if (!driver) {
      return res.status(401).send({ message: 'You need to signup' });
    }

    const activeTrackerSession = await TrackerSession.findOne({
      isActive: true,
      driverId: driver._id,
    })
      .lean()
      .exec();

    if (!activeTrackerSession) {
      return res.status(403).send({ message: 'You need to login' });
    }

    const location = await Location.create({
      type: 'Point',
      coordinates: [latitude, longitude],
    });

    const trackerSession = await TrackerSession.findOneAndUpdate(
      {
        isActive: true,
        driverId: driver._id,
      },
      {
        $push: {
          locationIds: location._id,
        },
      },
      { new: true }
    )
      .lean()
      .exec();

    return res.status(200).send(trackerSession);
  } catch (e) {
    return res.status(500).end();
  }
};
