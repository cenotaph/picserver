const folderRoutes = require('./folders')

const appRouter = (app, fs) => {
  folderRoutes(app, fs)
}

module.exports = appRouter