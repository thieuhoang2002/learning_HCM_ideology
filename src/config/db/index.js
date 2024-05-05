const mongoose = require('mongoose');

function connect() {
    try {
        const db = mongoose.connect(
            'mongodb+srv://thieuhoangent:thhoang0903@cluster0.ba6xpv6.mongodb.net/tracnghiem_tthcm',
        );
        console.log('connect thanh cong!');
    } catch (error) {
        console.log('connect that bai!');
    }
}

module.exports = { connect };
