const express = require('express')
const router = express.Router()
const session = require('express-session')
const { User } = require('../../models')

//REGISTER
router.get('/', (req, res) => {
    let errorMsg;
    if (req.query.err) errorMsg = req.query.err
    //If a user is logged in, redirect to home
    if (req.session.user) res.redirect('/')
    else res.render('register', { errorMsg })
}).post('/', (req, res) => {
    User
        .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            budget: 100000
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            // res.send(err.message)
            res.redirect(`/register?err=${err}`)
        })
})

module.exports = router