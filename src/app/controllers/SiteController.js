const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mquery } = require('mongoose');

class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            res.render('home');
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    
      
}

module.exports = new SiteController();
