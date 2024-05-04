const path = require('path')
const express = require('express') //đi vào thư mục node module để lấy ra express
const morgan = require('morgan') //thư viện morgan
const handlebars = require('express-handlebars');// thư viện 
const app = express() //gọi function ở trong express
const port = 3000 //run website ở port nào?

app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
  extname:".hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'))


//route: tuyến đường
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/news', (req, res) => {
  res.render('news')
})

//127.0.0.1 = localhost

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
