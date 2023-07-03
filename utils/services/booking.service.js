/* eslint-disable quotes */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const { Booking } = require('../../db/models');
const bookingModelSchema = require('../validations/bookingModel.schema');
const { op, queryTypes } = require('../../external/database');

module.exports = {
  checkValidFlightTicket: async (departureDate, departureTime) => {
    const bookingDateTime = moment().tz('Asia/Jakarta');
    const departureDateTime = moment(`${departureDate} ${departureTime}`, 'YYYY-MM-DD HH:mm').tz(
      'Asia/Jakarta'
    );

    const bookingExpiration = departureDateTime.clone().subtract(2, 'hours');
    const paymentExpiration = departureDateTime.clone().subtract(1, 'day');
    const paymentExpirationDate = new Date(departureDateTime.clone().subtract(1, 'hours').format());

    if (bookingDateTime.isAfter(bookingExpiration)) {
      // Expired booking, tidak bisa melakukan pemesanan
      return {
        status: false,
        message: 'Booking time has expired!',
      };
    }

    if (bookingDateTime.isAfter(paymentExpiration)) {
      return {
        status: true,
        message: 'Booking created hours.',
        data: {
          paymentExpiration: moment(paymentExpirationDate).format(),
        },
      };
    }

    // Booking valid
    return {
      status: true,
      message: 'Booking created.',
      data: {
        paymentExpiration: moment(bookingDateTime).add(1, 'day').format(),
      },
    };
  },
  createBooking: async (bookingData, options = null) => {
    const { error, value } = bookingModelSchema.validate(bookingData);

    // if error
    if (error) {
      return {
        status: false,
        message: error.details[0].message,
        data: null,
      };
    }

    const booking = await Booking.create(
      {
        booking_code: value.booking_code,
        status: value.status || 'Unpaid',
        payment_status: value.payment_status || false,
        tax: value.tax,
        total_price: value.total_price,
        exp: value.exp,
        flight_id: value.flight_id,
        user_id: value.user_id,
      },
      options
    );

    return booking;
  },

  findBookingWithUserIdAndBookingCode: async (userId, bookingCode) => {
    const booking = await Booking.findOne({
      where: {
        user_id: userId,
        booking_code: bookingCode,
      },
    });
    return booking;
  },

  updateBookingPaymentWithBookingCode: async (bookingCode) => {
    const booking = await Booking.update(
      { payment_status: true, status: 'Issued' },
      {
        where: {
          booking_code: bookingCode,
        },
      }
    );
    return booking;
  },

  getBookingWithBookingCode: async (userId, bookingCode) => {
    let query = `
    SELECT 
      "Bookings"."booking_code",
      "Flights"."departure_time",
      "Flights"."arrival_time",
      "Flights"."departure_date",
      "Flights"."arrival_date",
      "Flights"."flight_number",
      "Flights"."price",
      "Flights"."departure_terminal_name",
      "Flights"."formatted_duration",
      "Airlines"."name" AS "airline_name",
      "Airlines"."logo_url",
      "Airlines"."airline_code",
      "Airports"."airport_code",
      "Airports"."name" AS "departure_airport_name",
      "Airports"."city" AS "departure_city",
      "ArrivalAirports"."airport_code" AS "arrival_airport_code",
      "ArrivalAirports"."name" AS "arrival_airport_name",
      "ArrivalAirports"."city" AS "arrival_city",
      "Classes"."name" AS "class_name",
      (SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'name', "Passengers"."name",
            'id', "Passengers"."id",
            'gender', "Passengers"."gender"
          )
        )
        FROM "Passengers"
        WHERE "Passengers"."booking_code" = "Bookings"."booking_code"
        AND "Passengers"."passenger_type" != 'baby'
      ) AS "passengers",
      "Bookings"."total_price",
      "Bookings"."tax",
      COUNT(CASE WHEN "Passengers"."passenger_type" = 'baby' THEN 1 END) AS "baby_count",
      COUNT(CASE WHEN "Passengers"."passenger_type" = 'adult' THEN 1 END) AS "adult_count",
      COUNT(CASE WHEN "Passengers"."passenger_type" = 'child' THEN 1 END) AS "child_count",
      "Bookings"."status",
      "Bookings"."payment_status",
      "Type_Flights"."name" AS "type_flight"
    FROM "Bookings"
    INNER JOIN "Flights" ON "Bookings"."flight_id" = "Flights"."id"
    INNER JOIN "Airlines" ON "Flights"."airline_id" = "Airlines"."id"
    INNER JOIN "Airports" ON "Flights"."departure_airport_code" = "Airports"."airport_code"
    INNER JOIN "Airports" AS "ArrivalAirports" ON "Flights"."arrival_airport_code" = "ArrivalAirports"."airport_code"
    INNER JOIN "Classes" ON "Flights"."class_id" = "Classes"."id"
    INNER JOIN "Passengers" ON "Bookings"."booking_code" = "Passengers"."booking_code"
    INNER JOIN "Type_Flights" ON "Flights"."type_flight_id" = "Type_Flights"."id"
    WHERE "Bookings"."user_id" = $1
    `;

    const params = [userId];

    if (bookingCode !== null) {
      query += ` AND "Bookings"."booking_code" = $2`;
      params.push(bookingCode);
    }

    query += `
    GROUP BY "Bookings"."booking_code",
    "Flights"."departure_time",
    "Flights"."arrival_time",
    "Flights"."departure_date",
    "Flights"."arrival_date",
    "Flights"."flight_number",
    "Flights"."price",
    "Flights"."departure_terminal_name",
    "Flights"."formatted_duration",
    "Airlines"."name",
    "Airlines"."logo_url",
    "Airlines"."airline_code",
    "Airports"."airport_code",
    "Airports"."name",
    "Airports"."city",
    "ArrivalAirports"."airport_code",
    "ArrivalAirports"."name",
    "ArrivalAirports"."city",
    "Classes"."name",
    "Bookings"."total_price",
    "Bookings"."tax",
    "Bookings"."status",
    "Bookings"."payment_status",
    "Type_Flights"."name"
    ORDER BY "Bookings"."updatedAt" DESC`;

    const bookings = await op.query(query, { bind: params, type: queryTypes.SELECT });

    return bookings;
  },
  getAllExpBookings: async () => {
    const currentDate = new Date();
    const bookings = await Booking.findAll({
      where: {
        exp: { [Op.lt]: currentDate },
        status: 'Unpaid',
        payment_status: false,
      },
    });

    return bookings;
  },

  cancelBooking: async (bookingCode) => {
    const booking = await Booking.update(
      { status: 'Cancelled' },
      { where: { booking_code: bookingCode } }
    );

    return booking;
  },
};
