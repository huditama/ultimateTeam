const express = require('express')
const router = express.Router()
const {
    User,
    Club,
    Rate,
    Player,
    Transaction,
    ClubPlayer
} = require('../../models')
const clubStats = require('../../helpers/atttack_defence_percent')

//Dashboard & Create Club (If club is still NULL)
router.get('/:id', (req, res) => {
    User
        .findOne({
            where: {
                id: req.params.id
            }
        }, {
            include: [Club]
        })
        .then((findOneUser) => {
            let errorMsg;
            if (req.query.err) errorMsg = req.query.err
            //If no one is logged in, redirect to home
            if (!req.session.user) res.redirect('/login')
            //If user already has a club, redirect to club dashboard
            else if (findOneUser.ClubId) res.redirect(`/dashboard/${req.params.id}/club`)
            //Create club if ClubId NULL
            else res.render('users/dashboard', {
                findOneUser,
                errorMsg
            })
        })
        .catch((err) => {
            res.send(err.message)
        })
}).post('/:id', (req, res) => {
    Club
        .create({
            name: req.body.name,
            UserId: req.params.id
        })
        .then((newClub) => {
            return User
                .update({
                    ClubId: newClub.id
                }, {
                    where: {
                        id: req.params.id
                    }
                })
        })
        .then(() => {
            res.redirect(`/dashboard/${req.params.id}/club`)
        })
        .catch((err) => {
            res.redirect(`/dashboard/${req.params.id}?err=${err}`)
        })
})


//Dashboard Club
router.get('/:id/club', (req, res) => {
    //TAMBAHIN ERROR KALO ORANG ITU ACCESS CLUB LAIN DI REDIRECT KE ERROR (NOT DONE)
    if (!req.session.user) res.redirect('/login')
    else {
        let query = {
            field: "id",
            orderBy: "ASC"
        }
        if (req.query.field) query = req.query
        let userData;
        let club;
        let transactionData;
        let index;
        let budget;

        User
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [Club]
            })
            .then((findOneUser) => {
                userData = findOneUser
                //If user tries to access but ClubId is NULL, redirect to create club page
                if (!findOneUser.ClubId) res.redirect(`/dashboard/${req.params.id}`)
                else {
                    return ClubPlayer
                        .findAll({
                            where: {
                                ClubId: userData.ClubId
                            },
                            include: [Player],
                            order: [
                                [Player, query.field, query.orderBy]
                            ]
                        })
                }
            })
            .then((findOneClub) => {
                // Render club Dasboard
                club = findOneClub
                return Transaction
                    .findAll({
                        where: {
                            UserId: req.params.id
                        },
                        include: [Player]
                    })
            })
            .then((transactions) => {
                transactionData = transactions
                index = transactions.map((el, i) => (el.amount / el.amount) * i)
                budget = transactions.map(el => el.budgetLeft)

                let buy;
                let sell;

                if (!transactions.length) {
                    buy = 0
                    sell = 0
                }
                if (!transactions.filter(el => el.type == "buy").length) {
                    buy = 0
                }
                if (!transactions.filter(el => el.type == "sell").length) {
                    sell = 0
                }
                if(transactions.filter(el => el.type == "sell").length > 0 ) {
                    sell = transactions.filter(el => el.type == "sell").map(e => e.amount).reduce((a, b) => a + b)
                }
                if(transactions.filter(el => el.type == "buy").length > 0) {
                    buy = transactions.filter(el => el.type == "buy").map(e => e.amount).reduce((a, b) => a + b)
                }

                let profit = +sell - +buy
                // console.log(profit)
          
                return User
                    .update({
                        profit
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
            })
            .then(() => {
                const attack = club.map(el => el.Player.attack)
                const defence = club.map(el => el.Player.defence)
                let stats;
                if (!attack.length || !defence.length) stats = null
                else stats = clubStats(attack, defence)
                res.render('users/userClub', {
                    findOneUser: userData,
                    club,
                    transactions: transactionData,
                    budget,
                    index,
                    stats,
                    query
                })

            })
            .catch((err) => {
                res.send(err.message)
            })
    }
})



module.exports = router