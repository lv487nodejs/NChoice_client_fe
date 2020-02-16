const mongoose = require('mongoose');
const config = require('config');

const db = 'mongodb+srv://lv487nodejs:nodejslv487@cluster0-ltcgb.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.massage);
        process.exit(1);
    }
};

module.exports = connectDB;
