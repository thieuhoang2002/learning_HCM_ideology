const express = require('express');
const router = express.Router();

const chuong1Controller = require('../app/controllers/Chuong1Controller');

//Tuyến đường luôn đọc từ trên xuống nên / sẽ đặt dưới cùng
router.post('/submit-answer', chuong1Controller.submit);
router.get('/', chuong1Controller.chuong1);

module.exports = router;
