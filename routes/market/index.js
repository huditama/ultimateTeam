const express = require('express')
const router = express.Router()
const session = require('express-session')
const { Player, ClubPlayer, Transaction, Rate, User } = require('../../models')
const buy = require('../../helpers/buy')
const sell = require('../../helpers/sell')
const { Op } = require('sequelize')
const fs = require('fs')
const { randomQuery } = require('../../helpers/generateMarket')

//Show Marketplace
router.get('/', (req, res) => {
    //If no user is logged in, render error page
    if (!req.session.user) res.render('error')
    else {
        let query = { field: "id", orderBy: "ASC" }
        let obj = randomQuery(JSON.parse(fs.readFileSync('query.json')).id)
        if (req.query.field) {
            query = req.query
            obj = {
                ...obj,
                order: [[query.field, query.orderBy]]
            }
        }
        Player
            .findAll(obj)
            .then((allPlayers) => {
                let errorMsg;
                if (req.query.err) errorMsg = req.query.err
                res.render('market/list', { allPlayers, errorMsg, query })
            })
            .catch((err) => {
                res.redirect(`/market?err=${err}`)
            })
    }
})

//Buy Player
router.get('/buy/:id', (req, res) => {
    let player;
    let user;
    User.
        findByPk(req.session.user.info.id) //FIND USER WITH ID THAT'S LOGGED IN
        .then((findOneUser) => {
            if (!findOneUser.ClubId) throw new Error("You don't have a club!")
            else {
                user = findOneUser
                return Player
                    .findByPk(req.params.id)
            }
        })
        .then((findOnePlayer) => {
            player = findOnePlayer
            if (user.budget < findOnePlayer.price) throw new Error('Insufficient budget!')
            else {
                return ClubPlayer
                    .create({
                        ClubId: user.ClubId,
                        PlayerId: req.params.id
                    })
            }
        })
        .then(() => {
            return User
                .update({
                    budget: buy(user.budget, player.price)
                }, { where: { id: user.id } })
        })
        .then(() => {
            return Transaction
                .create({
                    type: 'buy',
                    UserId: user.id,
                    PlayerId: player.id,
                    amount: player.price,
                    budgetLeft: buy(user.budget, player.price)
                })
        })
        .then(() => {
            res.redirect(`/dashboard/${user.id}/club`)
        })
        .catch((err) => {
            res.redirect(`/market?err=${err}`)
        })
})

//Sell Player by Latest Rate
router.get('/sell/:id', (req, res) => {
    let latestRate;
    let player;
    let user;
    Rate
        .findAll({ order: [['id', 'DESC']], limit: 1 })
        .then((rate) => {
            latestRate = rate[0]
            return User
                .findByPk(req.session.user.info.id)
        })
        .then((findOneUser) => {
            user = findOneUser
            return ClubPlayer
                .findOne({ where: { id: req.params.id }, include: [Player] })
        })
        .then((findOnePlayer) => {
            player = findOnePlayer.Player
            return ClubPlayer
                .destroy({ where: { id: req.params.id } })
        })
        .then(() => {
            return User
                .update({
                    budget: sell(user.budget, player.price * latestRate.sell_rate)
                }, { where: { id: user.id } })
        })
        .then(() => {
            return Transaction
                .create({
                    type: 'sell',
                    UserId: user.id,
                    PlayerId: player.id,
                    amount: player.price * latestRate.sell_rate,
                    budgetLeft: sell(user.budget, player.price * latestRate.sell_rate)
                })
        })
        .then(() => {
            res.redirect(`/dashboard/${user.id}/club`)
        })
        .catch((err) => {
            res.send(err.message)
        })
})

module.exports = router