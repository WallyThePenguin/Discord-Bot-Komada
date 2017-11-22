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
    const allowedTypes = ['rules', 'links']
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
  
<:band:337827458915237888>  **__BAND:__** <https://ezlgg.com/band>

<:discord:337828611187015680>  **__EZL LLC:__** <https://ezlgg.com/discord>

<:twitter:337829617098424321> **__Twitter:__** 
English: <https://twitter.com/EZL_Official>
Espanol: <https://twitter.com/EZL_OficialES>

<:facebook:337567436364709898> **__Facebook:__**
English: <https://www.facebook.com/EZLOfficial>
Espanol: <https://www.facebook.com/EZLOficialES>

<:youtube:337567570251218946> **__YouTube:__** <https://www.youtube.com/c/EZLOfficial>`)
      default:
        return msg.reply(`That is not a valid type. Valid types are ${allowedTypes.join(', ')}`)
    }
    return msg.reply({ embed })
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
