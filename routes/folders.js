const fs = require('fs')

const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => {
      if (err) reject(err)

      resolve(data);
    })
  )
const folderRoutes = (app, fs) => {

  const dataPath = './data'
  
  const writeFile = (fileData, callback,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        throw err
      }
      callback();
    })
  }

  

  app.get('/folder/:folderName', async (req, res) => {
    let json = await readFile(dataPath + '/' + req.params.folderName + '.json')
    res.send(JSON.parse(json))
  })

  app.put('/folder/:folderName', async (req, res) => {
    // console.log('params are ')
    // console.log(req.query)
    let systempw = await readFile('./.passwd', 'utf8')
    systempw = systempw.toString().replace(/\n$/,'')
    if (systempw == req.query.password) {
      let data = req.body
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`folder ${req.params.folderName} updated`)
      }, dataPath + '/' + req.params.folderName + '.json')
    } else {
      res.status(403).send(`Forbidden!!`)
    }
  })
  
  app.get('/folders', async (req, res) => {
    let folders = []
    let promises = []
    const fileList = fs.readdirSync(dataPath)
    for(let i = 0; i < fileList.length; i++) {
      let json = await readFile(dataPath + '/' + fileList[i])
      let j = JSON.parse(json)
      let randomImage = j.images[Math.floor(Math.random() * j.images.length)]
      let cover = {"title": j.title , "folder_name": j.folder_name,  "cover_image": randomImage.filename, "portrait": randomImage.portrait ? true : false, "description": j.description, "image_count": j.images.length }
      folders.push(cover)
    }
    // console.log(folders)
    res.send(folders)
  })
}

module.exports = folderRoutes