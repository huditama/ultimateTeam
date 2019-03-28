function randomizeRate() {
    return Math.round((Math.random() * (2 - 0.5 + 1) + 0.5) * 100) / 100
}
module.exports = randomizeRate