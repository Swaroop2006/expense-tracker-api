
const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// GET API
app.get("/api/info", (req, res) => {
    res.json({
        project: "Expense Tracker",
        version: "1.0.0",
        developer: "Swaroop"
    });
});

// POST API - Create Transaction
app.post("/api/transactions", (req, res) => {

    const { title, amount, type, category } = req.body;

    // Validate title
    if (!title || !title.trim()) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            message: "Amount must be a number greater than 0"
        });
    }

    // Validate transaction type
    if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
            message: "Type must be either income or expense"
        });
    }

    // Validate category
    if (!category || !category.trim()) {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    // Create transaction object
    const transaction = {
        title,
        amount,
        type,
        category
    };

    console.log("Received Transaction:", transaction);

    return res.status(201).json({
        message: "Transaction created successfully",
        data: transaction
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
