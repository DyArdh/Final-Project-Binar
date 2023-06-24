/* eslint-disable no-param-reassign */
const { Flight } = require('../../db/models');
const { op, queryTypes } = require('../../external/database');

module.exports = {
  getFlightByFilter: async (data, sort, type) => {
    const { from, to, departure, totalPassanger = 0, classId } = data;

    if (!type) type = 'departure';
    if (!sort) sort = 'asc';

    let query = `
    WITH purchased_passengers AS (
      SELECT
        "Flights".id,
        COALESCE(COUNT(p.id), 0) AS total_passengers
      FROM
        "Flights"
        LEFT JOIN "Bookings" b ON "Flights".id = b.flight_id
        LEFT JOIN "Passengers" p ON b.booking_code = p.booking_code
      WHERE
        p.passenger_type <> 'baby'
      GROUP BY
        "Flights".id
    )
    SELECT
        "Flights".id,
        "Flights".departure_time,
        "Flights".arrival_time,
        "Flights".departure_date,
        "Flights".arrival_date,
        "Flights".price,
        "Flights".departure_terminal_name,
        "Flights".formatted_duration duration,
        "Flights".flight_number,
        departure_airport.airport_code departure_airport_code,
        departure_airport.name departure_airport,
        departure_airport.continent departure_airport_continent,
        departure_airport.city departure_airport_city,
        departure_airport.country departure_airport_country,
        departure_airport.is_international departure_airport_international,
        arrival_airport.airport_code arrival_airport_code,
        arrival_airport.name arrival_airport,
        arrival_airport.continent arrival_airport_continent,
        arrival_airport.city arrival_airport_city,
        arrival_airport.country arrival_airport_country,
        arrival_airport.is_international arrival_airport_international,
        classes.name as class,
        classes.seat_capacity,
        airlines.name airline_name,
        airlines.logo_url,
        airlines.airline_code,
        information_flight.baggage_capacity,
        information_flight.cabin_capacity,
        information_flight.flight_entertainment,
        type_flight.name type_flight,
        COALESCE(purchased_passengers.total_passengers, 0) AS total_passengers,
        classes.seat_capacity - COALESCE(purchased_passengers.total_passengers, 0) AS available_ticket
    FROM
        "Flights"
        INNER JOIN "Classes" classes ON "Flights".class_id = classes.id
        INNER JOIN "Airlines" airlines ON "Flights".airline_id = airlines.id
        INNER JOIN "Airports" departure_airport ON "Flights".departure_airport_code = departure_airport.airport_code
        INNER JOIN "Airports" arrival_airport ON "Flights".arrival_airport_code = arrival_airport.airport_code
        INNER JOIN "Information_Flights" information_flight ON "Flights".information_flights_id = information_flight.id
        INNER JOIN "Type_Flights" type_flight ON "Flights".type_flight_id = type_flight.id
        LEFT JOIN purchased_passengers ON "Flights".id = purchased_passengers.id
    WHERE
        departure_airport.airport_code = '${from}' and
        arrival_airport.airport_code = '${to}' and
        "Flights".departure_date >= '${departure}' and
        classes.seat_capacity - COALESCE(purchased_passengers.total_passengers, 0) > ${totalPassanger} and
        "Flights".class_id = '${classId}'
    `;

    if (type === 'price') query += `ORDER BY "Flights".price ${sort}`;
    if (type === 'duration') query += `ORDER BY duration ${sort}`;
    if (type === 'departure') {
      query += `ORDER BY "Flights".departure_time ${sort}, "Flights".departure_date ${sort}`;
    }
    if (type === 'arrival') {
      query += `ORDER BY "Flights".arrival_time ${sort}, "Flights".arrival_date ${sort}`;
    }

    const result = await op.query(query, { type: queryTypes.SELECT });
    const flights = result.map((flight) => flight);

    return flights;
  },

  getFlightById: async (flightId) => {
    const flight = await Flight.findOne({ where: { id: flightId } });

    return flight;
  },
};
