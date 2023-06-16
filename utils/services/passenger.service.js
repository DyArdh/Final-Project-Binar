const { Passenger } = require('../../db/models');

module.exports = {
  createManyPassenger: async (data, options = null) => {
    const passengers = await Passenger.bulkCreate(data, options);

    return passengers;
  },
};
