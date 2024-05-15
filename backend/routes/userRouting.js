const router = require("express").Router();
const { createUser, validate } = require("../models/user");

router.post("/", async (req, res) => {
    try {
        // Validate user input
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;
        const userData = { username, email, password };

        const createdUser = await createUser(userData);

        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user", error);
        if (error.message === 'User already exists with the same username or email') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
