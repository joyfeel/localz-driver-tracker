import mongoose from 'mongoose';

export const connect = () => {
  const connectionuri =
    process.env.MONGO_USERNAME || process.env.MONGO_PASSWORD
      ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
      : `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

  mongoose.connect(connectionuri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
