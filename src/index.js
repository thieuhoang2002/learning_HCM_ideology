//config env
require('dotenv').config()

const axios = require('axios');
const session = require('express-session');
const path = require('path');
const express = require('express'); //đi vào thư mục node module để lấy ra express
const morgan = require('morgan'); //thư viện morgan
const handlebars = require('express-handlebars'); // thư viện

const Handlebars = require('handlebars');
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

const cors = require('cors');
const app = express(); //gọi function ở trong express
const port = 3002; //run website ở port nào?
// const { MongoClient } = require('mongodb');
const db = require('./config/db');

db.connect();

const route = require('./routes');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
); //middleware xử lý dữ liệu từ form submit lên
app.use(express.json()); //xử lý dữ liệu KHI DÙNG THƯ VIỆN XMLhttpRequest, fetch, axios, jqruery ajax,...

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//session
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }));

//Routes init
route(app);

//127.0.0.1 = localhost

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
