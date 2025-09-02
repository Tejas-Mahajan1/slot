# Slot Booking Application

A simple slot booking application with a Next.js + TailwindCSS frontend and a Node.js + Express backend using Firestore for persistence. Users can select a date and book 30-minute slots between 9:00 AM and 5:00 PM. Already-booked slots are hidden from the available list.

## Features
- Calendar input to select a date
- 30-minute slots from 09:00 to 17:00 (16 slots/day)
- Book a single available slot
- Prevent double booking
- Success message on booking

## Tech Stack
- Frontend: Next.js (React), TailwindCSS
- Backend: Node.js, Express
- Database: Firestore (via Firebase Admin SDK)

## Prerequisites
- Node.js 18+
- Firebase project with Firestore enabled
- A Firebase service account key JSON file


## Project Structure
- `backend/` - Express server, Firestore integration
- `frontend/` - Next.js app with TailwindCSS

## Install & Run

### 1) Backend
```bash
cd backend
npm install
# Ensure GOOGLE_APPLICATION_CREDENTIALS is set in your shell
npm run dev   # starts on http://localhost:3001
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev   # starts on http://localhost:3000
```

Ensure both servers are running. The frontend calls the backend at `http://localhost:3001`.

## Configuration (optional)
You can configure the frontend API base URL via an environment variable. Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Then in `frontend/app/page.js`, update the fetch URLs to use `process.env.NEXT_PUBLIC_API_URL` if desired.

## API Documentation

Base URL: `http://localhost:3001`

- GET `/`  
  Health check. Returns a simple message.

- GET `/slots?date=YYYY-MM-DD`  
  Returns available time slots for the given date.
  - Query params: `date` (required, format `YYYY-MM-DD`)
  - Response:
  ```json
  {
    "date": "2025-01-01",
    "slots": ["09:00", "09:30", ...]
  }
  ```

- POST `/book`  
  Books a specific slot for a given date.
  - Body (JSON):
  ```json
  { "date": "YYYY-MM-DD", "time": "HH:mm" }
  ```
  - Responses:
    - `200` `{ "success": true, "message": "Slot booked successfully" }`
    - `400` `{ "error": "Date and time are required" }`
    - `409` `{ "error": "Slot already booked" }`
    - `500` `{ "error": "Failed to book slot" }`

## Implementation Notes
- Slot generation: 30-minute increments from 09:00 to 17:00 (16 total)
- Firestore collection: `bookings` with docs `{ date: string, time: string }`
- Double booking prevention: Query on `date` and `time` before creating a booking
- CORS: Backend allows requests from `http://localhost:3000`

## Development Tips
- If you change Firebase credentials, restart the backend.
- Ensure your system time/timezone matches expectations for date selection.
- For production, set stricter CORS and Firestore Security Rules.

## License
MIT
