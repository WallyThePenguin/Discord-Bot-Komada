const { Command } = require('klasa')
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const vg = require('../../functions/vg.js')
const crypto = require('../../functions/crypto/crypto')
const moment = require('moment')
moment().format()

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'stats',
      aliases: ['vgs', 's', 'vgstats'],
      permLevel: 0,
      botPerms: [], // Add Embed links perm
      requiredSettings: [],
      description: 'See your stats based on the matches made in last 28 days. You can also filter by game modes.',
      quotedStringSupport: true,
      usage: '[username:str] [server:str] [mode:str] [...]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [username, server, ...mode]) {
    const allowedRegions = ['na', 'eu', 'sa', 'sea', 'sg', 'cn']
    let lowerRegion, region, ign, name, rosterI, rosterP, gameString, gameHero
    if (server) {
      if (username) ign = username
      lowerRegion = server.toLowerCase()
      region = vg.region(this.client, msg, lowerRegion)
    }
    if (server && !allowedRegions.includes(lowerRegion)) return msg.reply(`⚠ \`${server}\` is not an allowed region. Allowed region are \`${allowedRegions.join('`, `')}\``)
    if (!username) {
      name = await this.client.settings.users.get(msg.author.id)
      if (!name) return msg.reply('⚠ You didn\'t give an IGN, and you have not done `$save yourIgn yourRegion`')
      if (!name.ign) return msg.reply('I recently got a huge update and the database that contains the names is still transferring over. In the meantime, you can do the $save command again. I am sorry for the inconvenience. For more info join me at https://discord.gg/VHVY7rb')
      ign = await crypto.decrypt(name.ign)
      region = await crypto.decrypt(name.region)
    }
    if (username && !server) {
      ign = username
      region = await this.client.settings.users.get(msg.author.id).region
    }
    if (!ign) return msg.reply('⚠ You didn\'t provide an IGN and region to search for. Are you sure you have done **$save yourIgn yourRegion**')
    const gameModes = {}, heroes = {}
    let sortedGames = [], sortedHeroes = []
    let wins = 0, afk = 0, hSkillTier = 0, krakens = 0, miners = 0, durations = 0, laneM = 0, jungleM = 0, farms = 0, golds = 0
    const now = new Date()
    const minus28Days = new Date((new Date() * 1) - 2419200000)
    const options = {
      page: {
        offset: 0,
        limit: 50
      },
      sort: '-createdAt', // -createdAt for reverse
      filter: {
        // gameMode: allModes,
        'createdAt-start': minus28Days.toISOString(), // ISO Date
        'createdAt-end': now.toISOString(), // ISO Date
        playerNames: [`${ign}`]
      }
    }
    const vainglory = new Vainglory(config.vgKey, options)
    const matches = await vainglory.region(region).matches.collection(options)
    if (matches.errors) {
      return msg.reply('This account does not exist in the API or it had a match with less than 6 players. Please try again or contact the developers for more help.')
    }
    for (let i = 0; i < matches.match.length; i++) {
      const currentMode = vg.gameModes(matches.match[i].data.attributes.gameMode).toLowerCase()
      let roster = matches.match[i].matchRoster
      if (!gameModes[currentMode]) {
        gameModes[currentMode] = 1
      } else {
        gameModes[currentMode]++
      }
      // Loop every player in every match to check which the IGN is.
      for (const team of roster) {
        for (const player of team.rosterParticipants) {
          if (player.participantPlayer.data.attributes.name === ign) {
            if (team === roster[0]) rosterI = 0
            else rosterI = 1
            for (let i = 0; i < team.rosterParticipants.length; i++) {
              if (team.rosterParticipants[i] !== player) continue
              rosterP = i
              break
            }
            break
          }
        }
      }
      // for (let a = 0; a < 3; a++) {
      //   for (let b = 0; b < 2; b++) {
      //     // Checks Blue side
      //     if (roster[b].rosterParticipants[a].participantPlayer.data.attributes.name === ign) {
      //       rosterI = b
      //       rosterP = a
      //       break
      //     }
      //   }
      //   // Cancel the loop if it has a value assigned
      //   if (rosterI) break
      // }
      roster = await roster[rosterI].rosterParticipants[rosterP].data.attributes.stats
      // Add the value of each person to their respective vars
      golds += Math.round(roster.gold)
      farms += Math.round(roster.farm)
      laneM += roster.nonJungleMinionKills
      jungleM += roster.jungleKills
      durations += matches.match[i].data.attributes.duration
      if (roster.skillTier > hSkillTier) hSkillTier = roster.skillTier
      krakens += roster.krakenCaptures
      miners += roster.crystalMineCaptures + roster.goldMineCaptures
      // Add 1 to wins if the person won
      if (roster.winner === 'true') wins++
      // Remove all * in hero names
      const currentHero = matches.match[i].matchRoster[rosterI].rosterParticipants[rosterP].data.attributes.actor.replace(/\*/g, '').toLowerCase()
      if (!heroes[currentHero]) {
        heroes[currentHero] = 1
      } else {
        heroes[currentHero]++
      }
      // Add 1 to afk counter if person AFK
      if (roster.wentAfk === true) afk++
    }
    // Sorting and converting the objects into arrays to call them
    for (const i in gameModes) {
      sortedGames.push([i, gameModes[i]])
    }
    for (const i in heroes) {
      sortedHeroes.push([i, heroes[i]])
    }
    sortedGames = sortedGames.sort((a, b) => b[1] - a[1])
    sortedHeroes = sortedHeroes.sort((a, b) => b[1] - a[1])
    // Converting array into embed format
    for (let b = 0; b < sortedGames.length; b++) {
      if (b === 3) break
      gameString += sortedGames[b][1] === 0 ? `` : `**${b + 1}:** ${sortedGames[b][0]}: ${sortedGames[b][1]}\n`
    }
    for (let c = 0; c < sortedHeroes.length; c++) {
      if (c === 3) break
      gameHero += sortedHeroes[c][1] === 0 ? `` : `**${c + 1}:** ${vg.heroes(`*${sortedHeroes[c][0]}*`)}\n`
    }
    const embed = new this.client.methods.Embed()
      .setTitle('See Even More At VGPRO.GG Here')
      .setAuthor(ign, this.client.user.avatarURL())
      .setColor(0x00AE86)
      .setDescription(`Stats of **${matches.match.length}** games played since 28 days ago`)
      .setFooter('<3 MadGlory, SEMC', this.client.user.avatarURL())
      .setURL(`https://vgpro.gg/players/${region}/${ign}`)
      .addField(`__Last Played__`, `Mode: ${vg.gameModes(matches.match[0].data.attributes.gameMode)}
Date: ${moment(matches.match[0].data.attributes.createdAt)}`, true)
      .addField(`__Game Mode__`, `${gameString}`, true)
      .addField(`__Favorite Heroes__`, `${gameHero}`, true)
      .addField(`__Total Stats__`, `Kraken Captures: ${krakens}
Miner Captures: ${miners}
Lane Minions: ${laneM}
Jungle Minions: ${jungleM}`, true)
      .addField('__Average Stats__', `Highest VST: ${vg.VST(hSkillTier)}
Win Rate: ${Math.round(wins / matches.match.length * 100)}%
Afk Rate: ${Math.round(afk / matches.match.length * 100)}%
CS/min: ${Math.round(farms / durations * 60)}
Gold/sec: ${Math.round(golds / durations)}`, true)
    return msg.reply({ embed })
  }
}
