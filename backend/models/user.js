const mongoose = require('mongoose');
const Joi = require('joi');
const crypto = require("crypto");

const SALT_LENGTH = parseInt(process.env.SALT_LENGTH) || 16;
const HASH_ITERATIONS = parseInt(process.env.HASH_ITERATIONS) || 10000;
const HASH_KEY_LENGTH = parseInt(process.env.HASH_KEY_LENGTH) || 64;
const HASH_ALGORITHM = process.env.HASH_ALGORITHM || 'sha512';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, Buffer.from(salt, 'hex'), HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_ALGORITHM).toString('hex');
};

const createUser = async (userData) => {
    try {
        const { error } = validate(userData);
        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(', '));
        }

        const existingUser = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });
        if (existingUser) {
            throw new Error('User already exists with the same username or email');
        }

        const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
        const hashedPassword = hashPassword(userData.password, salt);

        const user = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            salt: salt
        });

        await user.save();
        return user;
    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
};

module.exports = { User, createUser, validate };
