const { Event } = require('klasa')
const config = require('../config/config.json')

module.exports = class extends Event {
  constructor (...args) {
    super(...args, { name: 'guildMemberUpdate', enabled: true })
  }

  async run (oldMember, newMember) {
    if (oldMember.guild.id !== config.ezl.id) return
    if (oldMember.roles === newMember.roles) return
    const oldRoles = oldMember.roles.array()
    const newRoles = newMember.roles.array()
    let gainedRole = oldRoles.length < newRoles.length
    if (gainedRole) {
      for (const newRole of newRoles) {
        if (oldRoles.includes(newRole)) continue
        console.log('after if in loop')
        switch (newRole.id) {
          case config.ezl.partners.celsior.id:
            return this.client.channels.get(config.ezl.partners.celsior.welcome).send(`Eng: Sup ${newMember} Everyone come welcome ${newMember} to **Celsior eSports**! This is an eSports Org for VainGlory! Make sure to read rules and use the #deleted-channel channel for some tunage 😜 ! Have a great time here, if you have any questions, don't hesitate to ask! 😉 
#SoarHigher!
            
Fr: Bonjouuuuur ${newMember}!! @here venez souhaitez le bonjour a ${newMember} dans notre serveur Celsior eSports!! C'est une organisation eSports pour Vainglory  !! N'oubliez pas de lire les règles  (et de les respectez :wink:), il y a un bot de musique a votre disposition utilisez le dans le salon dédié à ça 🎧🎧🎵🎶 !! Passez du bon temps parmi nous ici , si vous avez des questions n'hésitez pas a demander ! 😉😘
**#SoarHigher#`)
          default:
        }
      }
    } else {
      for (const oldRole of oldRoles) {
        if (newRoles.includes(oldRole)) continue
        switch (oldRole.id) {
          case config.ezl.partners.celsior.id:
            const tag = newMember.user.tag
            return this.client.channels.get(config.ezl.partners.celsior.welcome).send(`Eng :  ${tag} just left Celsior eSports. Bye bye ${tag} we will not miss you 😢 
            
Fr:  ${tag} Vient de partir de Celsior eSportstriste 😢 ou pas 😂, a part ça tu nous manqueras pas 😛`)
          default:
        }
      }
    }
  }
  async init () {

  }
}
