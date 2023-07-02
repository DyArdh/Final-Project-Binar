/* eslint-disable comma-dangle */
const moment = require('moment-timezone');
// service
const {
  checkValidFlightTicket,
  createBooking,
  findBookingWithUserIdAndBookingCode,
  updateBookingPaymentWithBookingCode,
  getBookingWithBookingCode,
} = require('../utils/services/booking.service');
const { getFlightById } = require('../utils/services/flight.service');

// models
const { sequelize } = require('../db/models');

// schema
const bookingSchema = require('../utils/validations/booking.schema');

// utils
const { createManyPassenger } = require('../utils/services/passenger.service');
const { createNotif } = require('../utils/services/notif.service');
const generateBookingCode = require('../utils/lib/booking-code.lib');
const nodemailerLib = require('../utils/lib/nodemailer.lib');
const formatCurrency = require('../utils/lib/currency.lib');

module.exports = {
  create: async (req, res, next) => {
    let transaction;
    try {
      const { error, value } = bookingSchema.validate(req.body);
      const { user } = req;

      // check if error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // get value
      const { passengers, information } = value;

      // get flight data
      const flightData = await getFlightById(information.flight_id);

      // check valid
      const isValid = await checkValidFlightTicket(
        flightData.departure_date,
        flightData.departure_time
      );

      if (!isValid.status) {
        return res.status(400).json({
          status: false,
          message: isValid.message,
          data: null,
        });
      }

      // gen booking token
      const bookingCode = generateBookingCode();

      // start transaction
      transaction = await sequelize.transaction();

      // store data
      await createBooking(
        {
          booking_code: bookingCode,
          tax: information.tax,
          total_price: information.total_price,
          flight_id: information.flight_id,
          user_id: user.id,
          exp: isValid.data?.paymentExpiration,
        },
        { transaction }
      );

      // add booking_code to passenger data
      const passengerData = passengers.map((passenger) => ({
        ...passenger,
        booking_code: bookingCode,
      }));

      // store passenger data
      await createManyPassenger(passengerData, { transaction });

      // end transaction
      await transaction.commit();

      // send email
      const htmlReservation = await nodemailerLib.getHtml('reservation-message.ejs', {
        user: {
          name: user.name,
          exp: moment(isValid.data?.paymentExpiration)
            .tz('Asia/Jakarta')
            .format('MMMM Do YYYY, h:mm:ss a'),
          total: formatCurrency(information.total_price),
          bookingCode,
        },
      });
      nodemailerLib.sendEmail(
        user.email,
        'Confirming Your Flight Ticket Booking - SkyPass',
        htmlReservation
      );

      // send notif
      await createNotif(user.id, {
        notif_type: 'Notifikasi',
        title: 'Status Pembayaran (Unpaid)',
        body: `Selesaikan pembayaran Anda sebelum tanggal ${moment(isValid.data?.paymentExpiration)
          .tz('Asia/Jakarta')
          .format('D MMMM YYYY')}`,
      });

      return res.status(201).json({
        status: true,
        message: 'created!',
        data: {
          booking_code: bookingCode,
        },
      });
    } catch (error) {
      // Rollback the transaction if an error occurred
      if (transaction) {
        await transaction.rollback();
      }
      next(error);
    }
    return null;
  },
  updatePayment: async (req, res, next) => {
    try {
      const { user } = req;
      const { bookingCode } = req.params;

      // find booking
      const booking = await findBookingWithUserIdAndBookingCode(user.id, bookingCode);

      if (!booking) {
        return res.status(404).json({
          status: false,
          message: 'booking code not found!',
          data: null,
        });
      }

      // check expired
      const now = new Date();

      if (now > booking.exp) {
        return res.status(410).json({
          status: false,
          message: 'booking has expired!',
          data: null,
        });
      }

      // check booking payment
      if (booking.payment_status) {
        return res.status(208).json({
          status: false,
          message: 'payment already done!',
          data: null,
        });
      }

      // update
      await updateBookingPaymentWithBookingCode(bookingCode);

      // send email
      const htmlSuccess = await nodemailerLib.getHtml('success-payment-message.ejs', {
        booking: {
          name: user.name,
          booking_code: bookingCode,
          total: formatCurrency(booking.total_price),
          payment_date: moment(now).tz('Asia/Jakarta').format('D MMMM YYYY, HH:mm:ss'),
        },
      });
      nodemailerLib.sendEmail(
        user.email,
        'Payment Confirmation: Flight Ticket Booking - SkyPass',
        htmlSuccess
      );

      // send notif
      await createNotif(user.id, {
        notif_type: 'Notifikasi',
        title: ' Pembayaran Berhasil!',
        body: `Pembayaran ${bookingCode} berhasil! Selamat menikmati perjalanan bersama SkyPass!`,
      });

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
  show: async (req, res, next) => {
    try {
      const { user } = req;
      const { bookingCode = null } = req.query;

      // check query
      if (bookingCode !== null) {
        const bookings = await getBookingWithBookingCode(user.id, bookingCode);
        return res.status(200).json({
          status: true,
          message: 'success!',
          data: {
            bookings,
          },
        });
      }

      const bookings = await getBookingWithBookingCode(user.id, bookingCode);

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          bookings,
        },
      });
    } catch (error) {
      next(error);
    }

    return null;
  },
};
