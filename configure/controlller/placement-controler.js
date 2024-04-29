const Placement = require('../models/Placement');

// Get All Placements
const getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create Placement
const createPlacement = async (req, res) => {
    try {
        const placement = new Placement(req.body);
        await placement.save();
        res.status(201).json(placement);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Placement By ID
const getPlacementById = async (req, res) => {
    try {
        const placement = await Placement.findById(req.params.id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json(placement);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Placement
const updatePlacement = async (req, res) => {
    try {
        const placement = await Placement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json(placement);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Placement
const deletePlacement = async (req, res) => {
    try {
        const placement = await Placement.findByIdAndRemove(req            .params.id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.json({ message: 'Placement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllPlacements,
    createPlacement,
    getPlacementById,
    updatePlacement,
    deletePlacement,
};

const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

module.exports = {
    generateOtp,
};
```

**mailer.js**:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendMail,
};



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const placementRoutes = require('./routes/placementRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/placements', placementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

}
