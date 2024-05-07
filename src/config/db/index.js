const mongoose = require('mongoose');

function connect() {
    try {
        const db = mongoose.connect(
            process.env.CONNECT_DB_SECRET,
        );
        console.log('connect thanh cong!');
    } catch (error) {
        console.log('connect that bai!');
    }
}

module.exports = { connect };
