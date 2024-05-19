const express = require('express');
const router = express.Router();

const chuong3Controller = require('../app/controllers/Chuong3Controller');

//Tuyến đường luôn đọc từ trên xuống nên / sẽ đặt dưới cùng
router.post('/submit-answer', chuong3Controller.submit);
router.get('/', chuong3Controller.chuong3);

module.exports = router;
