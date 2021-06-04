const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const app = express()

global.viewEngine = 'pug'
app.set('view engine', global.viewEngine)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)
app.use('/', errorController.get404)

app.use(errorController.handleError)

app.listen(3000)
