const { Op } = require('sequelize')

function randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuery(idx) {
    let queries = [
        { where: { attack: { [Op.between]: [35, 76] } }, limit: 5 },
        { where: { attack: { [Op.between]: [15, 35] } }, limit: 5 },
        { where: { attack: { [Op.between]: [90, 100] } }, limit: 5 },
        { where: { attack: { [Op.between]: [20, 25] } }, limit: 5 },
        { where: { attack: { [Op.between]: [10, 50] } }, limit: 5 },
        { where: { defence: { [Op.between]: [45, 90] } }, limit: 5 },
        { where: { defence: { [Op.between]: [5, 10] } }, limit: 5 },
        { where: { defence: { [Op.between]: [38, 49] } }, limit: 5 },
        { where: { defence: { [Op.between]: [20, 25] } }, limit: 5 },
        { where: { defence: { [Op.between]: [10, 50] } }, limit: 5 },
        { where: { price: { [Op.gt]: 5000 } }, limit: 5 },
        { where: { price: { [Op.gt]: 10000 } }, limit: 5 },
        { where: { price: { [Op.gt]: 20000 } }, limit: 5 },
        { where: { price: { [Op.gt]: 30000 } }, limit: 5 },
        { where: { price: { [Op.lt]: 50000 } }, limit: 5 },
        { where: { price: { [Op.lt]: 60000 } }, limit: 5 },
        { where: { price: { [Op.lt]: 70000 } }, limit: 5 },
        { where: { price: { [Op.lt]: 80000 } }, limit: 5 },
        { where: { price: { [Op.lt]: 90000 } }, limit: 5 },
        { where: { price: { [Op.between]: [5000, 10000] } }, limit: 5 },
        { where: { price: { [Op.between]: [10000, 15000] } }, limit: 5 },
        { where: { price: { [Op.between]: [15000, 20000] } }, limit: 5 },
        { where: { price: { [Op.between]: [60000, 65000] } }, limit: 5 },
        { where: { price: { [Op.between]: [65000, 70000] } }, limit: 5 },
        { where: { price: { [Op.between]: [70000, 75000] } }, limit: 5 },
        { where: { price: { [Op.between]: [75000, 80000] } }, limit: 5 },
        { where: { price: { [Op.between]: [80000, 90000] } }, limit: 5 },
        { where: { price: { [Op.between]: [13000, 45000] } }, limit: 5 },
        { where: { price: { [Op.notBetween]: [20000, 40000] } }, limit: 5 },
        { where: { name: { [Op.substring]: '%i%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%ij%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%o%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%a%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%Pan%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%h%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%H%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%de%' } }, limit: 5 },
        { where: { name: { [Op.substring]: '%c%' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%a' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%b' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%c' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%d' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%e' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%f' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%g' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%h' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%i' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%w' } }, limit: 5 },
        { where: { name: { [Op.endsWith]: '%a' } }, limit: 5 }
    ]
    return queries[idx]
}
randomQuery()

module.exports = {
    randomQuery,
    randomizer
}