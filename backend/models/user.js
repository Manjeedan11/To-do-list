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
        username: Joi.string().regex(/^[a-zA-Z0-9_]{3,30}$/).required().label("Username")
        .message({
            'string.pattern.base': 'Username must contain only letters, numbers, and underscores and be between 3 to 30 characters long'
        }),
        email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required().label("Email")
        .message({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required'
        }),
        password: Joi.string().min(8).required().label("Password")
        .messages({
            'string.min': 'Password must be minimum 8 characters long',
        })
    });
    return schema.validate(data);
}