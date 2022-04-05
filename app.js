const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/goukaou', (req, res) => {
  res.render('goukaou')
})

app.listen(port, () => {
  console.log(`The GOUKAOU web is running on http://localhost:${port}`)
})