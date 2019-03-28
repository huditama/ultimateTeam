const express = require('express')
const router = express.Router()


//LOGOUT
router.get('/', (req, res) => {
    //If no user is logged in, render error page
    if (!req.session.user) res.render('error')
    else {
        req.session.destroy((err) => {
            if (err) res.send(err.message)
            else res.redirect('/')
        })
    }
})

module.exports = router