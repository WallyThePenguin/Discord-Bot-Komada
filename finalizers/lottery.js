const config = require('../config/config.json')
const { Finalizer } = require('klasa')

module.exports = class extends Finalizer {
  constructor (...args) {
    super(...args, {
      name: 'lottery',
      enabled: true
    })
  }

  run (msg, mes, start) {
    if (mes !== 'vg') return
    if (!config.lottery.onOff) return
    let winChance = config.lottery.chance
    if (msg.guild && msg.guild.id === '67200685216641024') winChance = 35
    /* make a random number from 1 to lottery chance amount */
    const randomChance = Math.floor((Math.random() * parseInt(winChance, 10)) + 1)
    /* If they hit #1 the lucky number they win */
    if (randomChance === 1) {
      const embed = new this.client.methods.Embed()
        .setTitle('Join This Discord And Follow Instruction To Get Your ICE!')
        .setAuthor(`OMG! ${msg.author.tag} You Are The Winner!`, this.client.user.avatarURL())
        .setColor(0x00AE86)
        .setDescription(`Please go to [Discord](https://discord.gg/VHVY7rb), to claim your ${config.lottery.amount} ICE by @HR-Team with your IGN! They will help add your name to the lottery-list. No this isn't a scam you really did win ICE for using the EZLBot.`)
        .setFooter('<3 EZL, SEMC', this.client.user.avatarURL())
        .setImage('https://images-ext-2.discordapp.net/external/aM23KqkTjuvGKo9k2TOgNkB5vvqeYOmonW_b5RzKIcw/https/vaingloryhack.com/wp-content/uploads/2017/03/download.png')
        .setURL('https://discord.gg/VHVY7rb')
      setTimeout(() => {
        msg.channel.send({ embed })
        this.client.channels.get('358074822678413314').send({ embed }) // LLC Server
      }, 1000)
    }
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
