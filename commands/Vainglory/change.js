const { Command } = require('klasa')
const crypto = require('../../functions/crypto/crypto')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'change',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Change a users ign and region.!',
      quotedStringSupport: true,
      usage: '<member:member> <ign:str{1,16}> <na|sa|eu|sea|sg|ea|cn>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [member, username, server]) {
    let region = server
    if (server === 'sea') region = 'sg'
    region = await crypto.encrypt(region)
    let ign = await crypto.encrypt(username)
    await this.client.settings.users.update(member.user, { ign: ign, region: region }, msg.guild.id)
    return msg.reply(`<@${member.id}> Your account is now saved into the database and now the bot will know who you are on all the ${this.client.guilds.size} servers.`)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}

exports.run = async (client, msg, [member, ign, server]) => {
  
}
