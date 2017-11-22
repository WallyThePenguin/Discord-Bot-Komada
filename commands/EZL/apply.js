const { Command } = require('klasa')
const config = require('../../config/config.json')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'apply',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Want to join the team? Fill out the correct application',
      quotedStringSupport: true,
      usage: '[org:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [org]) {
    if (!org) return msg.reply('Please provide both the org and department you want to apply for.')
    const allowedOrgs = ['ezl']
    const lowerOrg = org.toLowerCase()
    if (!allowedOrgs.includes(lowerOrg)) return msg.reply(`That is not a valid org. Valid orgs are ${allowedOrgs.join(', ')}`)
    const embed = new this.client.methods.Embed()
      .setColor(0x00AE86)
      .setURL('https://ezlgg.com/discord')
      .setTitle('Come Join The EZL Discord Server')
      .setFooter(`© Esports Zodiac League LLC (EZL)`)
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setThumbnail(msg.author.displayAvatarURL)
      .setDescription(`${msg.author} has applied!`)
    switch (lowerOrg) {
      case 'ezl':
        let answers = ['moderator', 'recruiter', 'teacher', 'streamer', 'caster', 'journalist', 'editor', 'organizer', 'public relations']
        let department, age, experience, recommendation
        msg.reply(`What are you trying to apply for? \`${answers.join(', ')}\``).then(message => {
          const filter = m => answers.includes(m.content.toLowerCase()) && m.author === msg.author
          // Errors: ['time'] treats ending because of the time limit as an error
          msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(dep => {
            department = dep.first().content
            msg.reply('How old are you? Please write it as a number. Example: `18`').then(message => {
              const filter = m => typeof parseInt(m.content, 10) === 'number' && m.author === msg.author
              // Errors: ['time'] treats ending because of the time limit as an error
              msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(yrs => {
                age = yrs.first().content
                msg.reply('Describe in **detail** about any experiences that you have?').then(message => {
                  const filter = m => m.author === msg.author
                  // Errors: ['time'] treats ending because of the time limit as an error
                  msg.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }).then(exp => {
                    experience = exp.first().content
                    msg.reply('Who recommended you to join? `If no one just write no one.`').then(message => {
                      const filter = m => m.author === msg.author
                      // Errors: ['time'] treats ending because of the time limit as an error
                      msg.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] }).then(rec => {
                        recommendation = rec.first().content
                        switch (department) {
                          case 'moderator':
                            let patience, verted, humble, confidence, working, fighting, agreed
                            msg.reply('Would you say you are `Patient` or `Impatient`?').then(message => {
                              const allowed = ['patient', 'impatient']
                              const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                              // Errors: ['time'] treats ending because of the time limit as an error
                              msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(pat => {
                                patience = pat.first().content
                                msg.reply('Would you say you are `Introvert` or `Extrovert`?').then(message => {
                                  const allowed = ['introvert', 'extrovert']
                                  const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                                  // Errors: ['time'] treats ending because of the time limit as an error
                                  msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(vert => {
                                    verted = vert.first().content
                                    msg.reply('Would you say you are `Humble` or `Cocky`?').then(message => {
                                      const allowed = ['humble', 'cocky']
                                      const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                                      // Errors: ['time'] treats ending because of the time limit as an error
                                      msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(humb => {
                                        humble = humb.first().content
                                        msg.reply('Would you say you are `Confident` or `Timid`?').then(message => {
                                          const allowed = ['confident', 'timid']
                                          const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                                          // Errors: ['time'] treats ending because of the time limit as an error
                                          msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(conf => {
                                            confidence = conf.first().content
                                            msg.reply(`Which option would you prefer? Please type \`1\` or \`2\`\n1) Working in a busy, active job with alot of interaction with people? example A morning shift convenience store cashier.\n\n2) Working in a quiet, non busy job with minimal interactions with people? example An overnight stock person.`).then(message => {
                                              const allowed = ['1', '2']
                                              const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                                              // Errors: ['time'] treats ending because of the time limit as an error
                                              msg.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }).then(work => {
                                                if (work.first().content === '1') working = 'Working in a busy, active job with alot of interaction with people? example A morning shift convenience store cashier.'
                                                else working = 'Working in a quiet, non busy job with minimal interactions with people? example An overnight stock person.'
                                                msg.reply(`Which option would you prefer? Please type \`1\` or \`2\`\n1) Try to resolve a fight between your friends.\n\n2) Staying out of it and letting them resolve it.`).then(message => {
                                                  const allowed = ['1', '2']
                                                  const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                                                  // Errors: ['time'] treats ending because of the time limit as an error
                                                  msg.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }).then(fight => {
                                                    if (fight.first().content === '1') fighting = 'Try to resolve a fight between your friends.'
                                                    else fighting = 'Staying out of it and letting them resolve it.'
                                                    msg.reply(`Human Resources not only tends to guests, members, staff and others needs for assistance but mainly ensures that rules and guidelines are being followed. Two such rules of EZL Inc. Is that No Gore or Pornography is allowed, being a Moderator means you may come across such material if a member or guest randomly posts such an offense. By entering your name below you legally confirm that you are 17 years old or older and EZL Inc is not responsible for any issues you may come across  and experience while moderating.`).then(message => {
                                                      const filter = m => m.author === msg.author
                                                      // Errors: ['time'] treats ending because of the time limit as an error
                                                      msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(name => {
                                                        agreed = name.first().content
                                                        msg.reply('Thank you so much for applying to <:ezlstaff:360772426902274058>! Your application has now been sent to the proper person and you will recieve a reply as soon as possible.')
                                                        embed.addField('What are you trying to apply for?', department)
                                                        embed.addField('How old are you?', age)
                                                        embed.addField('Describe in **detail** about any experiences that you have?', experience)
                                                        embed.addField('Who recommended you to join? `If no one just write no one.', recommendation)
                                                        embed.addField('Would you say you are `Patient` or `Impatient`?', patience)
                                                        embed.addField('Would you say you are `Introvert` or `Extrovert`?', verted)
                                                        embed.addField('Would you say you are `Humble` or `Cocky', humble)
                                                        embed.addField('Would you say you are `Confident` or `Timid`?', confidence)
                                                        embed.addField('Which option would you prefer? 1) Working in a busy, active job 2) Working in a quiet, non busy job', working)
                                                        embed.addField('Which option would you prefer? 1) Try to resolve a fight between your friends. 2) Staying out of it and letting them resolve it.', fighting)
                                                        embed.addField('Do you agree to HR rules?', agreed)
                                                        return this.client.channels.get(config.ezl.channels.applications.hr).send({ embed })
                                                      })
                                                    })
                                                  })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                            break
                          case 'public relations':
                          case 'pr':
                            let account, reason
                            msg.reply('Which do you want to do `Twitter` or `Facebook`?').then(message => {
                              const allowed = ['twitter', 'facebook']
                              const filter = m => m.author === msg.author && allowed.includes(m.content.toLowerCase())
                              // Errors: ['time'] treats ending because of the time limit as an error
                              msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(acc => {
                                account = acc.first().content
                                msg.reply('Why do you want to be a part of Public Relations in EZL? *10 Minutes to answer*').then(message => {
                                  const filter = m => m.author === msg.author
                                  // Errors: ['time'] treats ending because of the time limit as an error
                                  msg.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] }).then(reas => {
                                    reason = reas.first().content
                                    msg.reply('Thank you so much for applying to <:ezlstaff:360772426902274058>! Your application has now been sent to the proper person and you will recieve a reply as soon as possible.')
                                    embed.addField('What are you trying to apply for?', department)
                                    embed.addField('How old are you?', age)
                                    embed.addField('Describe in **detail** about any experiences that you have?', experience)
                                    embed.addField('Who recommended you to join? `If no one just write no one.', recommendation)
                                    embed.addField('Which do you want to do `Twitter` or `Facebook`?', account)
                                    embed.addField('Why do you want to be a part of Public Relations in EZL?', reason)
                                    return this.client.channels.get(config.ezl.channels.applications.pr).send({ embed })
                                  })
                                })
                              })
                            })
                            break

                          default:
                        }
                      })
                    })
                  })
                })
              })
            })
          })
        })
        break
      default:
    }
  }

  async init () {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
}
