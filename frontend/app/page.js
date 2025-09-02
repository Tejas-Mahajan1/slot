import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [booking, setBooking] = useState(false);

  // Fetch slots when date changes
  const fetchSlots = async (selectedDate) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setSlots([]);
    try {
      const res = await fetch(
        `http://localhost:3001/slots?date=${selectedDate}`
      );
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setSlots(data.slots);
    } catch (err) {
      setError("Could not load slots. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (e.target.value) fetchSlots(e.target.value);
    else setSlots([]);
  };

  // Book a slot
  const handleBook = async (slot) => {
    setBooking(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3001/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: slot }),
      });
      if (res.status === 409) {
        setError("Slot already booked. Please refresh.");
      } else if (!res.ok) {
        setError("Booking failed. Try again.");
      } else {
        setSuccess("Slot booked successfully!");
        // Remove booked slot from UI
        setSlots((prev) => prev.filter((s) => s !== slot));
      }
    } catch (err) {
      setError("Booking failed. Try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Slot Booking</h1>
        <label className="flex flex-col gap-2">
          <span className="font-medium">Select Date:</span>
          <input
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={date}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </label>
        {loading && <div className="text-blue-500 text-center">Loading slots...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        {date && !loading && !error && (
          <div>
            <h2 className="font-semibold mb-2 text-center">Available Slots</h2>
            {slots.length === 0 ? (
              <div className="text-gray-500 text-center">No slots available</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleBook(slot)}
                    disabled={booking}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
