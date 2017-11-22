const { Client, PermissionLevels } = require('klasa')
const config = require('./config/config.json')

const client = new Client({
  clientOptions: {
    fetchAllMembers: true
  },
  prefix: '$',
  cmdEditing: true,
  cmdLogging: true,
  typing: true,
  readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
})

client.permissionLevels = new PermissionLevels()
  // Everyone can use these commands
  .addLevel(0, false, () => true)
  // Members are testers that get access to commands to test
  .addLevel(6, false, (client, msg) => config.testers.includes(msg.author.id))
  // Members that are mods on their server
  .addLevel(7, false, (client, msg) => {
    if (!msg.guild) return false
    if (msg.member.roles.get(msg.guild.settings.modRole)) return true
    return false
  })
  // Members that are admins on their server
  // .addLevel(8, false, (client, msg) => msg.guild && msg.guild.settings.admins.includes(msg.author.id))
  // Members that are the guild owners
  .addLevel(9, false, (client, msg) => msg.guild && msg.member === msg.guild.owner)
  .addLevel(10, false, (client, msg) => msg.author === client.owner)
  // Allows the bot owner to use Bot Owner only commands

client.login(config.botToken)
