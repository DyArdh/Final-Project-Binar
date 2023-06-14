const {
  getUserByEmail,
  getUserById,
  updateUserByEmail,
} = require('../utils/services/user.service');
const userUpdateValidationSchema = require('../utils/validations/updateUser.schema');

module.exports = {
  whoami: async (req, res, next) => {
    try {
      const { user } = req;

      const userData = await getUserByEmail(user.email);

      res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            is_google: userData.is_google,
          },
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = userUpdateValidationSchema.validate(req.body);

      // check if error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // check user
      const user = await getUserById(id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'credential not found!',
          data: null,
        });
      }

      // get body value
      const { name } = value;

      // update user
      await updateUserByEmail(user.email, { name });

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: null,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
