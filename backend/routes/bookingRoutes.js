const express = require('express');
const { handleGetSlots, handleBookSlot } = require('../controllers/bookingController');

const router = express.Router();

router.get('/slots', handleGetSlots);
router.post('/book', handleBookSlot);

module.exports = router;


