//Modules
const express = require('express')
const router = express.Router()
const session = require('express-session')
const CronJob = require('cron').CronJob
const { randomizer, randomQuery } = require('../helpers/generateMarket')
const fs = require('fs')


//Route destinations
const dashboard = require('./dashboard')
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const market = require('./market')


//Session Middleware
router.use(session({ secret: 'keyboard cat' }))
router.use((req, res, next) => {
    if (!req.session.user) res.locals.user = null
    else res.locals.user = req.session.user
    next()
})

//Cron Middleware (REGENERATE MARKETPLACE)
// router.use((req, res, next) => {
//     new CronJob('*/5 * * * *', function () {
//         fs.writeFileSync('query.json', JSON.stringify({
//             id: randomizer(0, 49)
//         }), 'utf8')
//         console.log('Regenerated Market!')
//     }, null, true, 'Asia/Jakarta');
//     next()    
// })

//Homepage
router.get('/', (req, res) => {
    res.render('homepage')
})


//Sub-routes!
router.use('/dashboard', dashboard)
router.use('/register', register)
router.use('/login', login)
router.use('/logout', logout)
router.use('/market', market)



//Error page if user tries to access other routes
router.get('*', (req, res) => {
    res.render('error')
})
module.exports = router