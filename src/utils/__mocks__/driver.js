export const mockDriverReq = {
  body: {
    email: 'joybee210@gmail.com',
    firstName: 'Joey',
    lastName: 'Chen',
  },
};

export const mockLatLongReq = {
  body: {
    email: 'joybee210@gmail.com',
    latitude: -37.61381,
    longitude: 144.6660788,
  },
};

export const mockRes = {
  status(status) {
    return this;
  },
  send(result) {},
  end() {},
};
