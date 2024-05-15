const mongoose = require("mongoose");

module.exports = () => {
    if (!process.env.DB) {
        console.error("MongoDB URI not found in environment variables.");
        return;
    }

    try {
        mongoose.connect(process.env.DB)
            .then(() => {
                console.log("Connected to database");
            })
            .catch(error => {
                console.error("Error connecting to database:", error);
            });
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}
