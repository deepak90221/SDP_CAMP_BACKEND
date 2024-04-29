const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');
const { generateOtp, verifyOtp } = require('../utils/otp');

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Send OTP
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = Date.now() + 300000; // OTP expires in 5 minutes
        
        await user.save();
        
        // Send OTP via email
        await sendMail(email, 'Your OTP', `Your OTP is ${otp}`);
        
        res.json({ message: 'OTP sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        res.json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
};
