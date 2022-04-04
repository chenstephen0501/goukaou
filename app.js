const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('123')
})

app.listen(port, () => {
  console.log(`The GOUKAOU web is running on http://localhost:${port}`)
})