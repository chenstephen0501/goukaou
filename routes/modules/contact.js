if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
  res.render('contact')
})
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    let msg_error = ''
    let msg_success
    if (!name || !email || !subject || !message) {
      msg_error = {
        name: '訪問者',
        message: '你沒有輸入訊息 !',
      }
      return res.render('contact', { msg_error })
    }
    
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false, 
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
    })
    const output = `
      <p> You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name} </li>
        <li>subject: ${req.body.subject} </li>
        <li>Email: ${req.body.email} </li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `
    msg_success = {
      name: `${req.body.name}`,
      message: '詢問信件己送出。',
    }
    let info = await transporter.sendMail({
      from: `Nodemailer Contact ${process.env.EMAIL_USERNAME}`,
      to: 'tom9876555@gmail.com',
      subject: 'Node Contact Request',
      text: 'Hello world?',
      html: output,
    })
    res.render('contact', { msg_success })
  } catch (err) {
    console.warn(err)
  }
})

module.exports = router
