function clubStats(attack, defence) {
  let totalAttack = attack.reduce((a, y) => a + y)
  let totalDefence = defence.reduce((a, y) => a + y)
  let totalSkill = totalAttack + totalDefence
  let attackPercentage = (totalAttack / totalSkill) * 100
  let defencePercentage = (totalDefence / totalSkill) * 100
  return [attackPercentage, defencePercentage]

}

module.exports = clubStats