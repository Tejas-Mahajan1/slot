const { getAvailableSlots, isSlotBooked, bookSlot } = require('../services/slotsService');

async function handleGetSlots(req, res) {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date is required' });
  try {
    const slots = await getAvailableSlots(date);
    res.json({ date, slots });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
}

async function handleBookSlot(req, res) {
  const { date, time } = req.body;
  if (!date || !time) return res.status(400).json({ error: 'Date and time are required' });
  try {
    const taken = await isSlotBooked(date, time);
    if (taken) return res.status(409).json({ error: 'Slot already booked' });
    await bookSlot(date, time);
    res.json({ success: true, message: 'Slot booked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to book slot' });
  }
}

module.exports = { handleGetSlots, handleBookSlot };


