const fs = require('fs')
const imgur = require('imgur')
imgur.setClientId(process.env.IMGUR_CLIENT_ID)

const localFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    const fileName = `upload/${file[0].originalname}`
    fs.readFile(file[0].path, (err, data) => {
      if (err) return reject('Error: ', err)
      fs.writeFile(fileName, data, () => {
        return resolve(`/${fileName}`)
      })
    })
  })
}
const localManyFileHandler = files => {
  if (!files) return null
  return Promise.all(
    files.map((file, _fileIndex) => {
      const fileName = `upload/${file.originalname}`
      return fs.promises.readFile(file.path)
        .then(data => fs.promises.writeFile(fileName, data))
        .then((data) => ({ name: file.originalname, url: `/${fileName}` }))
    }))
    .catch(err => console.log(err))
}

const imgurFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    imgur.uploadFile(file[0].path)
      .then(img => {
        resolve(img ? img.link : null)
      })
      .catch(err => reject(err))
  })
}
const imgurManyFileHandler = files => {
  if (!files) return null
  return Promise.all(
    files.map((file, _fileIndex) => {
      const fileName = file.originalname
      return imgur.uploadFile(file.path)
        .then(img => {
          return { name: fileName, url: img.link }
        })
    }))
    .catch(err => console.error(err))
}

module.exports = { 
  localFileHandler,
  localManyFileHandler,
  imgurFileHandler,
  imgurManyFileHandler
}