const express = require('express');
const router = express.Router();

const chuong2Controller = require('../app/controllers/Chuong2Controller');

//Tuyến đường luôn đọc từ trên xuống nên / sẽ đặt dưới cùng
router.post('/submit-answer', chuong2Controller.submit);
router.get('/', chuong2Controller.chuong2);

module.exports = router;
