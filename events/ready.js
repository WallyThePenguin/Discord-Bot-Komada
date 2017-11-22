const { Event } = require('klasa')
const config = require('../config/config.json')

module.exports = class extends Event {
  constructor (...args) {
    super(...args, { name: 'ready', enabled: true })
  }

  async run (client) {

  }
  async init () {
    async function validate (resolver, user) {
      console.log('before the resolver')
      const result = await resolver.user(user)
      if (!result) throw 'The parameter <User> is invalid. Please try again'
      return result
    };
    const schema = {
      ign: {
        type: 'String',
        default: null,
        array: false
      }
    }
    this.client.settings.add('users', validate, schema);
    this.client.user.setActivity(`$help|In ${this.client.guilds.size} Guilds.`)
  }
}
