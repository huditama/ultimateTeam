//Regenerate Rate & Send Email
const { Rate, User } = require('./models')
const CronJob = require('cron').CronJob
const randomizeRate = require('./helpers/generateRate')
const sendEmail = require('./helpers/sendEmail')

new CronJob('*/5 * * * *', function () {
    let rate;
    Rate.
        create({ sell_rate: randomizeRate() })
        .then(() => {
            return Rate
                .findAll({ order: [['id', 'desc']], limit: 1 })
        })
        .then((latestRate) => {
            rate = latestRate[0]
            return User
                .findAll()
        })
        .then((allUsers) => {
            allUsers.forEach((user) => {
                sendEmail(user.email, rate.sell_rate)
                // console.log(user)
            })
        })
        .then(() => {
            console.log('Regenerated rate!')
            console.log('E-mail sent!')
        })
        .catch((err) => console.log(err.message))
}, null, true, 'Asia/Jakarta')