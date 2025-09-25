// app.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ============= In-Memory Seat State ============= //
// Each seat can be: available | locked | booked
// Example structure: { id: 1, status: "available", lockedBy: null, lockTime: null }

let seats = [];
const TOTAL_SEATS = 10; // Example: 10 seats in theater

// Initialize seats
for (let i = 1; i <= TOTAL_SEATS; i++) {
  seats.push({
    id: i,
    status: "available",
    lockedBy: null,
    lockTime: null,
  });
}

// Lock expiration time (in milliseconds)
const LOCK_TIMEOUT = 60 * 1000; // 1 minute

// Function to check and release expired locks
function releaseExpiredLocks() {
  const now = Date.now();
  seats.forEach((seat) => {
    if (seat.status === "locked" && seat.lockTime && now - seat.lockTime > LOCK_TIMEOUT) {
      console.log(`Lock expired for Seat ${seat.id}`);
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockTime = null;
    }
  });
}

// Run cleanup every 10 seconds
setInterval(releaseExpiredLocks, 10000);

// ============= ROUTES ============= //

// 1. Get all seats
app.get("/seats", (req, res) => {
  res.json({
    success: true,
    message: "List of all seats",
    data: seats,
  });
});

// 2. Lock a seat
app.post("/seats/:id/lock", (req, res) => {
  const seatId = parseInt(req.params.id);
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: "User is required!" });
  }

  const seat = seats.find((s) => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ success: false, message: "Seat not found!" });
  }

  // If seat is already booked
  if (seat.status === "booked") {
    return res.status(400).json({ success: false, message: "Seat already booked!" });
  }

  // If seat is locked by another user
  if (seat.status === "locked" && seat.lockedBy !== user) {
    return res.status(400).json({ success: false, message: "Seat is locked by another user!" });
  }

  // Lock seat
  seat.status = "locked";
  seat.lockedBy = user;
  seat.lockTime = Date.now();

  res.json({
    success: true,
    message: `Seat ${seatId} locked for ${user}`,
    data: seat,
  });
});

// 3. Confirm booking
app.post("/seats/:id/confirm", (req, res) => {
  const seatId = parseInt(req.params.id);
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: "User is required!" });
  }

  const seat = seats.find((s) => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ success: false, message: "Seat not found!" });
  }

  // Check if seat is locked by this user
  if (seat.status !== "locked" || seat.lockedBy !== user) {
    return res.status(400).json({ success: false, message: "Seat not locked by you or already booked!" });
  }

  // Confirm booking
  seat.status = "booked";
  seat.lockedBy = null;
  seat.lockTime = null;

  res.json({
    success: true,
    message: `Seat ${seatId} successfully booked by ${user}`,
    data: seat,
  });
});

// 4. Reset seats (for testing/demo)
app.post("/reset", (req, res) => {
  seats = [];
  for (let i = 1; i <= TOTAL_SEATS; i++) {
    seats.push({
      id: i,
      status: "available",
      lockedBy: null,
      lockTime: null,
    });
  }
  res.json({ success: true, message: "All seats reset to available" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎟️ Ticket Booking System running at http://localhost:${PORT}`);
});
