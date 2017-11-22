const vg = require('./vg.js')

exports.getData = (matches, num) => {
  let roster
  let player
  const match = matches.match[num]
  const players = 6
  const stats = [match.matchRoster[0].data.attributes.stats, match.matchRoster[1].data.attributes.stats]

  const duration = match.data.attributes.duration
  let durationMin = Math.floor(duration / 60)
  let durationSec = duration % 6

  if (durationMin < 10) durationMin = `0${durationMin.toString()}`
  if (durationSec < 10) durationSec = `0${durationSec.toString()}`

  const data = {
    region: match.data.attributes.shardId.toUpperCase(),
    gameMode: vg.gameModes(match.data.attributes.gameMode),
    durationMin,
    durationSec,
    time: match.data.attributes.createdAt,
    side: {
      a: stats[0].side,
      aWinLoss: match.matchRoster[0].data.attributes.won,
      b: stats[1].side,
      bWinLoss: match.matchRoster[1].data.attributes.won
    },
    aces: {
      a: stats[0].acesEarned,
      b: stats[1].acesEarned
    },
    tGold: {
      a: parseInt(stats[0].gold, 10).toLocaleString(),
      b: parseInt(stats[1].gold, 10).toLocaleString()
    },
    tKills: {
      aHeroes: stats[0].heroKills,
      bHeroes: stats[1].heroKills,
      aKrakens: stats[0].krakenCaptures,
      bKrakens: stats[1].krakenCaptures,
      aTurrets: stats[0].turretKills,
      bTurrets: stats[1].turretKills
    },
    names: {},
    igns: {},
    heroes: {},
    assists: {},
    crystalMiners: {},
    goldMiners: {},
    deaths: {},
    cs: {},
    csMin: {},
    afkTime: {},
    gold: {},
    goldMin: {},
    items: {},
    karma: {},
    kills: {},
    krakens: {},
    level: {},
    minions: {},
    lane: {},
    jungle: {},
    vst: {},
    skin: {},
    turret: {},
    afk: {},
    afkM: {},
    afkS: {}
  }
  for (let i = 0; i < players; i++) {
    if (i < 3) {
      roster = match.matchRoster[0]
    } else {
      roster = match.matchRoster[1]
    }
    switch (i) {
      case 0:
      case 3:
        roster = roster.rosterParticipants[0]
        break
      case 1:
      case 4:
        roster = roster.rosterParticipants[1]
        break
      case 2:
      case 5:
        roster = roster.rosterParticipants[2]
        break
    }
    if (!roster) continue
    player = `p${i + 1}`
    data.names[player] = roster.participantPlayer.data.attributes.name
    data.igns[player] = roster.participantPlayer.data.attributes.name
    data.heroes[player] = vg.heroes(roster.data.attributes.actor)
    roster = roster.data.attributes.stats
    data.assists[player] = roster.assists
    data.crystalMiners[player] = roster.crystalMineCaptures
    data.goldMiners[player] = roster.goldMineCaptures
    data.deaths[player] = roster.deaths
    data.cs[player] = Math.floor(roster.farm)
    data.csMin[player] = Math.floor(roster.farm / (data.duration / 60))
    data.gold[player] = Math.floor(roster.gold).toLocaleString()
    data.goldMin[player] = Math.floor(parseInt(roster.gold, 10) / (parseInt(duration, 10) / 60)).toLocaleString()
    data.items[player] = vg.items(roster.items)
    data.karma[player] = vg.karma(roster.karmaLevel)
    data.kills[player] = roster.kills
    data.krakens[player] = roster.krakenCaptures
    data.level[player] = roster.level
    data.minions[player] = roster.minionKills
    data.lane[player] = parseInt(roster.minionKills, 10) - parseInt(roster.jungleKills, 10)
    data.jungle[player] = roster.jungleKills
    data.vst[player] = vg.VST(roster.skillTier)
    data.skin[player] = roster.skinKey
    data.turret[player] = roster.turretCaptures
    data.afk[player] = roster.wentAfk
    data.afkTime[player] = roster.firstAfkTime
    data.afkM[player] = Math.floor(parseInt(roster.afkTime, 10) / 60)
    data.afkS[player] = Math.floor(parseInt(roster.afkTime, 10) % 60)
  }
  return data
}

exports.matches = (kills, deaths, assists, cs, csMin, jungle, gold, goldMin) => {
  let playerOutput = ``
  playerOutput += `KDA: ${kills}/${deaths}/${assists}      CS: ${cs}     CS/min: ${csMin}     Jungle: ${jungle}     Gold: ${gold}      Gold/min: ${goldMin}`
  return playerOutput
}
