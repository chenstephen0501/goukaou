if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js');
const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const helpers = require('./tools/helpers.js')

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`The GOUKAOU web is running on http://localhost:${PORT}`)
})