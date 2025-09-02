const { db } = require('../config/firebase');

function generateSlots() {
  const slots = [];
  let start = 9 * 60;
  for (let i = 0; i < 16; i++) {
    const hour = Math.floor(start / 60);
    const min = start % 60;
    const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    slots.push(time);
    start += 30;
  }
  return slots;
}

async function getAvailableSlots(date) {
  const bookingsSnap = await db.collection('bookings')
    .where('date', '==', date)
    .get();
  const bookedTimes = bookingsSnap.docs.map(doc => doc.data().time);
  const allSlots = generateSlots();
  return allSlots.filter(slot => !bookedTimes.includes(slot));
}

async function isSlotBooked(date, time) {
  const existing = await db.collection('bookings')
    .where('date', '==', date)
    .where('time', '==', time)
    .get();
  return !existing.empty;
}

async function bookSlot(date, time) {
  await db.collection('bookings').add({ date, time });
}

module.exports = { generateSlots, getAvailableSlots, isSlotBooked, bookSlot };


