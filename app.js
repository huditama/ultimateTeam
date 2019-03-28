const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use("*/css",express.static("public/css"));
app.use('*/js',express.static("public/js"));
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(port, () => console.log(`Listening on port ${port}!`))