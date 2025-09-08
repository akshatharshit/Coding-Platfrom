const redisClient = require("../config/redis");
const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { firstName, emailId, password } = req.body;

        if (!firstName || !emailId || !password) {
            return res.status(400).send("All fields are required.");
        }

        // Check if user already exists
        const existing = await User.findOne({ emailId });
        if (existing) {
            return res.status(400).send("User with this email already exists.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with defaults
        const user = await User.create({
            firstName,
            emailId,
            password: hashedPassword,
            role: 'user',
            problemSolved: [] // ✅ Important to avoid duplicate key error
        });

        // Create JWT token
        const token = jwt.sign(
            { _id: user._id, emailId: user.emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        // Respond
        res.status(201).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                emailId: user.emailId,
                role: user.role
            },
            message: "Registered Successfully"
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};




// Login user
const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) throw new Error("Email and password are required");

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid Credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Credentials");

        const token = jwt.sign(
            { _id: user._id, emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 }
        );

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(200).json({
            user: {
                firstName: user.firstName,
                emailId: user.emailId,
                _id: user._id,
                role: user.role
            },
            message: "Login Successful"
        });
    } catch (err) {
        res.status(401).send("Error: " + err.message);
    }
};

// Logout user
const logout = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(400).send("Token not found in cookies");

        const payload = jwt.decode(token);
        if (!payload) return res.status(400).send("Invalid token");

        await redisClient.set(`token:${token}`, 'Blocked');
        await redisClient.expireAt(`token:${token}`, payload.exp);

        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.status(200).send("Logged Out Successfully");
    } catch (err) {
        res.status(503).send("Error: " + err.message);
    }
};

// Admin register
const adminRegister = async (req, res) => {
    try {
        validate(req.body);
        const { firstName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });

        const token = jwt.sign(
            { _id: user._id, emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 }
        );

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("Admin Registered Successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};

// Delete profile
const deleteProfile = async (req, res) => {
    try {
        const userId = req.result._id;
        await User.findByIdAndDelete(userId);
        res.status(200).send("Deleted Successfully");
    } catch (err) {
        res.status(500).send("Internal Server Error: " + err.message);
    }
};

module.exports = {
    register,
    login,
    logout,
    adminRegister,
    deleteProfile
};
