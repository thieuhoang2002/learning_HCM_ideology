const mongoose = require('mongoose');
const { Schema } = mongoose;

const chuong1Schema = new Schema({
    question: String,
    answers: [
        {
            answer: String,
            isCorrect: Boolean,
        },
    ],
});

const Chuong1 = mongoose.model('chuong1', chuong1Schema);

module.exports = Chuong1;
