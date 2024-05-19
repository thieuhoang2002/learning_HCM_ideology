const Chuong3 = require('../models/Chuong3');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class Chuong3Controller {
    // [GET] /chuong3
    chuong3(req, res, next) {
        // find all documents
        Chuong3.find({})
            .then((chuong3) => {
                res.render('chuong3', {
                    chuong3: mutipleMongooseToObject(chuong3),
                });
            })
            .catch((err) => {
                console.error('Error querying chuong3:', err);
                next(err);
            });
    }

    // submit(req, res, next) {
    //     const submittedAnswers = req.body; // Lấy các đáp án mà người dùng đã chọn từ req.body
    //     const results = []; // Đối tượng hoặc mảng để lưu trữ kết quả
    //     let correctCount = 0; // Số câu trả lời đúng
    //     let totalCount = 0; // Tổng số câu hỏi
    
    //     Chuong2.find({})
    //         .then((chuong2) => {
    //             chuong2.forEach(question => {
    //                 let correctAnswer = ''; // Biến để lưu trữ đáp án đúng
    //                 // Tìm đáp án đúng trong mảng câu trả lời của câu hỏi hiện tại
    //                 question.answers.forEach(answer => {
    //                     if (answer.isCorrect) {
    //                         correctAnswer = answer.answer;
    //                     }
    //                 });
    
    //                 const userAnswer = submittedAnswers[`answer${question._id}`]; // Lấy đáp án mà người dùng đã chọn cho câu hỏi hiện tại
    
    //                 // Kiểm tra xem người dùng đã trả lời đúng hay sai và tạo kết quả
    //                 const result = {
    //                     question: question.question,
    //                     userAnswer: userAnswer,
    //                     correctAnswer: correctAnswer,
    //                     isCorrect: userAnswer === correctAnswer
    //                 };
    
    //                 // Tăng số câu trả lời đúng nếu câu trả lời của người dùng là đúng
    //                 if (result.isCorrect) {
    //                     correctCount++;
    //                 }
    
    //                 // Tăng tổng số câu hỏi
    //                 totalCount++;
    
    //                 // Nếu người dùng trả lời sai, tô màu đỏ cho câu hỏi
    //                 if (!result.isCorrect) {
    //                     result.question = `<span style="color: red;">${result.question}</span>`;
    //                 }
    
    //                 // Thêm kết quả vào mảng kết quả
    //                 results.push(result);
    //             });
    
    //             // Chuyển hướng đến trang ketquachuong2 và truyền dữ liệu kết quả
    //             res.render('ketquachuong2', { 
    //                 results: results,
    //                 correctCount: correctCount,
    //                 totalCount: totalCount
    //             });
    //         })
    //         .catch(err => {
    //             // Xử lý lỗi nếu có
    //             console.error('Error:', err);
    //             res.status(500).send('Internal Server Error');
    //         });
    // }
    
    submit(req, res, next) {
        const submittedAnswers = req.body; // Lấy các đáp án mà người dùng đã chọn từ req.body
        const results = []; // Đối tượng hoặc mảng để lưu trữ kết quả
        let correctCount = 0; // Số câu trả lời đúng
        let totalCount = 0; // Tổng số câu hỏi
    
        Chuong3.find({})
            .then((chuong3) => {
                chuong3.forEach(question => {
                    let correctAnswer = ''; // Biến để lưu trữ đáp án đúng
                    let allAnswers = []; // Mảng để lưu trữ tất cả các đáp án
    
                    // Tìm đáp án đúng và lưu tất cả các đáp án trong mảng allAnswers
                    question.answers.forEach(answer => {
                        allAnswers.push(answer.answer);
                        if (answer.isCorrect) {
                            correctAnswer = answer.answer;
                        }
                    });
    
                    const userAnswer = submittedAnswers[`answer${question._id}`]; // Lấy đáp án mà người dùng đã chọn cho câu hỏi hiện tại
    
                    // Kiểm tra xem người dùng đã trả lời đúng hay sai và tạo kết quả
                    const result = {
                        question: question.question,
                        userAnswer: userAnswer,
                        correctAnswer: correctAnswer,
                        isCorrect: userAnswer === correctAnswer,
                        allAnswers: allAnswers // Lưu trữ tất cả các đáp án
                    };
    
                    // Tăng số câu trả lời đúng nếu câu trả lời của người dùng là đúng
                    if (result.isCorrect) {
                        correctCount++;
                    }
    
                    // Tăng tổng số câu hỏi
                    totalCount++;
    
                    // Thêm kết quả vào mảng kết quả
                    results.push(result);
                });
    
                // Chuyển hướng đến trang ketquachuong3 và truyền dữ liệu kết quả
                res.render('ketquachuong3', {
                    results: results,
                    correctCount: correctCount,
                    totalCount: totalCount
                });
            })
            .catch(err => {
                // Xử lý lỗi nếu có
                console.error('Error:', err);
                res.status(500).send('Internal Server Error');
            });
    }
    

}

module.exports = new Chuong3Controller();
