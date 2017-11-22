const { Monitor } = require('klasa')
const config = require('../config/config.json')

module.exports = class extends Monitor {
  constructor (...args) {
    super(...args, {
      name: 'streamalert',
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true
    })
  }

  run (msg) {
    if (msg.channel.id !== config.ezl.channels.live) return
    return msg.guild.channels.get(config.ezl.channels.prrequest).send(msg.content)
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
