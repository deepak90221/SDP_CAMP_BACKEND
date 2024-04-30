const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb+srv://admin1:admin1@cluster0.l8awxgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
module.exports = connectDB;
