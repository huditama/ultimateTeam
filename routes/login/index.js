const express = require('express')
const router = express.Router()
const { User } = require('../../models')

//LOGIN
router.get('/', (req, res) => {
    let errorMsg;
    if (req.query.err) errorMsg = req.query.err
    //If a user is logged in, redirect to home
    if (req.session.user) res.redirect('/')
    else res.render('login', { errorMsg })
}).post('/', (req, res) => {
    User
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) throw new Error('User does not exist!')
            else if (!user.validatePassword(req.body.password)) throw new Error('Wrong password!')
            else if (user.validatePassword(req.body.password)) {
                req.session.user = {
                    login: true,
                    info: user
                }
                res.redirect('/')
            }
        })
        .catch((err) => {
            res.redirect(`/login?err=${err}`)
        })

})

module.exports = router