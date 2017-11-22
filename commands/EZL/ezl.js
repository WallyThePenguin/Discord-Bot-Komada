const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ezl',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Learn about EZL',
      quotedStringSupport: false,
      usage: '[type:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [type]) {
    const allowedTypes = ['rules', 'links','bot','leagues','staff','vg8','lottery']
    if (!allowedTypes.includes(type)) return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    const embed = new this.client.methods.Embed()
      .setColor(0x00AE86)
      .setURL('https://ezlgg.com/discord')
      .setTitle('Come Join The EZL Discord Server')
      .setFooter(`© Esports Zodiac League LLC (EZL)`)
    switch (type) {
      case 'rules':
        embed.setAuthor('EZL Rules And Regulations', this.client.user.avatarURL())
        embed.setDescription('Please read the following rules and guidelines for the EZL LLC server. Joining this server constitutes an agreement to abide by these rules. Failure to do so will result to your removal. This server has members of all ages, nationalities, creeds, religions, beliefs, orientations etc., so be respectful of others while you are here.')
        embed.addField('General Rules:', `:one: Vulgarity is strictly prohibited, its common sense. This includes but not limited to: text, audio, PFP, Discord tags.
:two: Do not ask for personal information. This includes but not limited to phone numbers, social media accounts or chat apps info. 
:three: Fake profiles or profiles seeking a boyfriend/girlfriend/'good time' will result in a permanent ban.
:four: No spamming. This includes but not limited to symbols, letters, emoticons, links, reactions & capitalized words.
:five: Innapropriate Usernames or Profile Pics are not allowed. Non compliance will result in your removal from the server. Contact <@&337341534661902337> to change your nicknames.`)
        embed.addField(`Harassment & Bigotry:`, `:one: Racism, sexism, or bigotry will result in a permanent ban.
:two: Negative text/audio interaction based on someone's gender, nationality, creed, religion, beliefs, sexuality, etc. will result in a permanent ban.
:three: Don't harass members. This includes personal attacks, jabs, quotes, and general toxicity.`)
        embed.addField(`Sharing Links:`, `:one: Links are subject to all listed rules. Members will be held responsible for their contents.
:two: Porn/gore and inappropriate image links will result in a ban.
:three: leaked content is not welcome in this server,  repeated offenses will result in a kick or a ban.
:four: Share links in proper channels, If link posting privileges are abused, they will be removed.`)
        break
      case 'links':
        return msg.channel.send(`<:ezl:337567718666534913> **__Website:__** <http://ezlgg.com/>
  
<<<<<<< HEAD
  <:band:337827458915237888>  **__BAND:__** <https://ezlgg.com/band>
  
  <:discord:337828611187015680>  **__EZL LLC:__** <https://ezlgg.com/discord>
  
  <:twitter:337829617098424321> **__Twitter:__** 
  English: <https://twitter.com/EZL_Official>
  Espanol: <https://twitter.com/EZL_OficialES>
  
  <:facebook:337567436364709898> **__Facebook:__**
  English: <https://www.facebook.com/EZLOfficial>
  Espanol: <https://www.facebook.com/EZLOficialES>
  
  <:youtube:337567570251218946> **__YouTube:__** <https://www.youtube.com/c/EZLOfficial>`)
  break
  case 'bot':
  return msg.channel.send(`
<:ezl:337567718666534913> **__EZLBot__** <:EZL2:361298596957519872>
Official hand made bot for EZL that has many features developed into it, it is also a \`Public Bot\` that most Vainglory players can use.`)
break
case 'leagues':
return msg.channel.send(`
**__Masters League:__**
<:ezl:337567718666534913> Is for Players with a pre made team that you want to play in a league.

**__Majors League:__**
<:ezl:337567718666534913> Is for Individuals who don’t have a team and are chosen by captains to be placed on a team.

**__Weekly Tournaments:__**
<:ezl:337567718666534913> Weekly fun tourneys with a nice reward at the end.`)
break
case 'staff':
return msg.channel.send(`
<:ezl:337567718666534913> **__Staff__**
Are people that help build and create EZL stronger and stronger everyday. They are the heart the pumps blood through this place.

<:ezl:337567718666534913> **__PR__**
Shares all the latest EZL news on social media Contact: Exec. Dir.: Satan Social Media Manager: angelita

<:ezl:337567718666534913> **__HR__**
The official Moderation and support team of EZL Contact: Exec. Dir.: AwakenOhSleeper Head of Moderating: Xenology

<:ezl:337567718666534913> **__News__**
Produces professionally written articles on the latests patches all the way to interview Contact: Exec. Dir.:Ryoshin Head: holland

<:ezl:337567718666534913> **__Translation__**
Native speakers that translate everything for EZL for everyone's participation Contact:Exec. Dir.:Ryohin Head: Azurus

<:ezl:337567718666534913> **__Design__**
Creates anything from professionally made logos to graphics Contact: Exec. Dir.:Satan Head:Ellte

<:ezl:337567718666534913> **__University__**
For people who want one on one training to improve their skillz in VG`)
break
case 'vg8':
return msg.channel.send(`
<:ezl:337567718666534913> **__VG8__**
A top division of EZL Master League where teams compete in a similar fashion as the official Vainglory8.`)
break
case 'lottery':
return msg.channel.send(`
<:ezl:337567718666534913> **__Lottery__**
When using the bot you’re put into a random drawing for ICE`)
      default:
        return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    }
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
