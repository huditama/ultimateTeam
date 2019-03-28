const express = require('express')
const router = express.Router()
const { User, Club} = require('../../models')

//
router.get('/', (req, res) => {
  User
    .findAll({
      order: [["profit", "DESC"]],
      limit: 5,
      include: {
        model : Club
      }
    })
    .then((userData) => {
      // res.send(userData)
      res.render('leaderBoard', {data: userData}) 
    })
    .catch((err) => {
      res.redirect(`/leaderboard?err=${err}`)
    })
})

module.exports = router