// app.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory array to store cards
let cards = [];
let idCounter = 1;

// ================== ROUTES ================== //

// 1. List all cards (GET)
app.get('/cards', (req, res) => {
    res.json({
        success: true,
        message: "List of all cards",
        data: cards
    });
});

// 2. Add a new card (POST)
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({
            success: false,
            message: "Suit and value are required!"
        });
    }

    const newCard = {
        id: idCounter++,
        suit,
        value
    };

    cards.push(newCard);
    res.status(201).json({
        success: true,
        message: "Card added successfully",
        data: newCard
    });
});

// 3. Get a specific card by ID (GET)
app.get('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const card = cards.find(c => c.id === cardId);

    if (!card) {
        return res.status(404).json({
            success: false,
            message: "Card not found!"
        });
    }

    res.json({
        success: true,
        message: "Card retrieved successfully",
        data: card
    });
});

// 4. Delete a card by ID (DELETE)
app.delete('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === cardId);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Card not found!"
        });
    }

    const deletedCard = cards.splice(index, 1);
    res.json({
        success: true,
        message: "Card deleted successfully",
        data: deletedCard[0]
    });
});

// ================== START SERVER ================== //
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
