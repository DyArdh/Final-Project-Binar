const { Class } = require('../../db/models');

module.exports = {
  getAllClass: async () => {
    const classes = await Class.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    return classes;
  },
};
