const mongoose = require('mongoose');
const { Schema } = mongoose;

const chuong2Schema = new Schema({
    question: String,
    answers: [
        {
            answer: String,
            isCorrect: Boolean,
        },
    ],
});

const Chuong2 = mongoose.model('chuong2', chuong2Schema);

module.exports = Chuong2;
