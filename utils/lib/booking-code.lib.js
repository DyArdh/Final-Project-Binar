function generateBookingCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let bookingCode = '';

  for (let i = 0; i < 9; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    bookingCode += randomChar;
  }

  return bookingCode;
}

module.exports = generateBookingCode;
