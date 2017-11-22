const config = require('../../config/config.json')
const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'lottery',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredSettings: [],
      description: 'Lottery settings',
      quotedStringSupport: false,
      usage: '<onOff|chance|amount|cooldown> <value:str>',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [type, value]) {
    switch (type) {
      case 'state':
        if (value !== 'on' || value !== 'off') return msg.reply('That is not a valid value for state')
        config.lottery.onOff = value
        break
      case 'chance':
        config.lottery.chance = value
        break
      case 'amount':
        config.lottery.amount = value
        break
      case 'cooldown':
        config.lottery.amount = value
        break
      default:
    }
    return msg.reply(`The ${type} has been set to ${value}`)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
