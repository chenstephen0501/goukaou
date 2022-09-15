if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const User = require('../user.js')
const db = require('../../config/mongoose.js')   

db.once('open', async () => {
	try {
			const newUser = {
					name: 'admin',
					email: 'root@example.com',
					password: 'root',
					isAdmin: true
			}
			const result = await User.create(newUser)
			if (result) {
				console.log('User created is done')
				db.close()
			}
	} catch(err) {
			console.error(err)
	}
})      