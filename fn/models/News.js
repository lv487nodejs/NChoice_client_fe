const mongoose = require('mongoose');

const { Schema } = mongoose;

const NewsSchema = new Schema({
    title: { 
        type: String,
        required: true
     },
    text: { 
        type: String, 
        required: true
        },
    date: {
        type: Date,
        default: Date.now
    },
    newsImage: {
        type: String, 
        required: true
    },
    newsVideo: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    authorPhoto: {
        type: String, 
        required: true
    }

});

const News = mongoose.model('news', NewsSchema);

module.exports = News;