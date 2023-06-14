// module
const moment = require('moment-timezone');

// data schedule
const flightDataRaw = require('../../db/seeders/data/schedules.json');
const flightData = flightDataRaw.slice(0, 100);
const { isValidYear, isValidMonth, getDatesOfMonth } = require('./moment.lib');
const { Flight } = require('../../db/models');

// variables
const TIMEZONE = 'Asia/Jakarta';
const year = Number(process.argv[2]);
const month = Number(process.argv[3]) - 1;

// validasi input
if (!isValidYear(year)) {
  console.log('Year input is not valid!');
  return;
}

if (!isValidMonth(month)) {
  console.log('Month input is not valid!');
  return;
}

// filter data
const scheduleMap = flightData.reduce(
  (acc, schedule) => {
    acc[schedule.flight_day].push(schedule);
    return acc;
  },
  {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  }
);

// setup variables for mapping
const datesOfMonth = getDatesOfMonth(year, month);

// fetch data
const airlines = require('../../db/seeders/data/airlines.json');
const airports = require('../../db/seeders/data/airports.json');
const classes = require('../../db/seeders/data/classes.json');
const informastions = require('../../db/seeders/data/informastionFlights.json');

// mapping
const flightSchedules = [];

// loop
for (const date of datesOfMonth) {
  const schedules = scheduleMap[date.dayOfWeek];

  for (const schedule of schedules) {
    const matchingAirlineIndex = airlines.findIndex(
      ({ airline_code }) => airline_code === schedule.airline_code
    );
    const matchingDepartureCode = airports.findIndex(
      ({ airport_code }) => airport_code === schedule.departure_airport
    );
    const matchingArrivalCode = airports.findIndex(
      ({ airport_code }) => airport_code === schedule.arrival_airport
    );

    const condition = schedule.arrival_base_timestamp - schedule.departure_base_timestamp < 0;

    if (
      condition ||
      matchingAirlineIndex === -1 ||
      matchingDepartureCode === -1 ||
      matchingArrivalCode === -1
    ) {
      continue; // Skip invalid data
    }

    const departureTimestamp = date.unix + schedule.departure_base_timestamp;
    const arrivalTimestamp = date.unix + schedule.arrival_base_timestamp;
    const departureTime = moment.unix(departureTimestamp).tz(TIMEZONE).format('HH:mm');
    const arrivalTime = moment.unix(arrivalTimestamp).tz(TIMEZONE).format('HH:mm');
    const flightDuration = (arrivalTimestamp - departureTimestamp) / 60;
    const formattedDuration = moment
      .utc()
      .startOf('day')
      .add(flightDuration, 'minutes')
      .format('H[h] m[m]');

    const departureDate = moment(date.string, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const combinedDateTime = moment.tz(
      departureDate + ' ' + departureTime,
      'YYYY-MM-DD HH:mm',
      TIMEZONE
    );
    const arrivalDate = moment(combinedDateTime)
      .clone()
      .add(flightDuration, 'minutes')
      .format('YYYY-MM-DD');

    //   push data
    flightSchedules.push({
      departure_time: departureTime,
      arrival_time: arrivalTime,
      departure_date: departureDate,
      arrival_date: arrivalDate,
      price: schedule.price,
      flight_number: schedule.flight_number,
      formatted_duration: formattedDuration,
      duration: flightDuration,
      departure_terminal_name: schedule.departure_terminal_name,
      // relasi
      class_id: Math.random() <= 0.7 ? 1 : Math.floor(Math.random() * classes.length - 1) + 2, // random
      airline_id: matchingAirlineIndex + 1,
      departure_airport_code: schedule.departure_airport,
      arrival_airport_code: schedule.arrival_airport,
      information_flights_id: Math.floor(Math.random() * informastions.length) + 1,
      type_flight_id: 1, // fix domestik terus
    });
  }
}

// console.log(flightSchedules.slice(0, 4));

// insert to db
(async () => {
  try {
    await Flight.bulkCreate(flightSchedules);
    console.log('done bang!');
  } catch (error) {
    console.log(error.message);
  }
})();
