if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const bcrypt = require('bcryptjs')

const User = require('../user.js')
const db = require('../../config/mongoose.js')   
const userData = require('./user.json')
db.once('open', async () => {
	try {
	  userData.map( async (user, _index, arr) => {
			try {
				const salt = await bcrypt.genSalt(10)
				const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
				await User.create(user)
				if (_index + 1 === arr.length) {
					console.log('User created is done')
					db.close()
				}
			} catch (err) {
				console.error(err)
			}
		})
	} catch (err) {
		console.error(err)
	}
})