const chuong1Router = require('./chuong1');
const chuong2Router = require('./chuong2');
const siteRouter = require('./site');

function route(app) {
    //route: tuyến đường
    app.use('/chuong1', chuong1Router);

    app.use('/chuong2', chuong2Router);

    app.use('/', siteRouter);
}

module.exports = route;
