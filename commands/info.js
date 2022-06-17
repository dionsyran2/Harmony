const config = require("../botinfo.json")
const os = require('os');
module.exports = {
    name: "info",
    description: "See some info about this bot",
    run: async function (message, args, client, discord) {

        try {
            let embed = new discord.MessageEmbed()
            embed.setAuthor(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            embed.setColor("#0097FF")
            embed.addFields(
                { name: `Version**       **`, value: config.version, inline: true },
                { name: `Library`, value: `${config.library}`, inline: true },
                { name: `Creator`, value: config.creator, inline: true },
                { name: `Servers**       **`, value: `${client.guilds.cache.size}`, inline: true },
                { name: `Architecture`, value: (await os.arch()), inline: true },
                { name: `Memory`, value: `${String((((await os.totalmem()) / 1000) / 1000) / 1000).split('.')[0]} GB`, inline: true },
                { name: `CPU`, value: (await os.cpus())[0].model, inline: true },
                { name: `OS`, value: `${await os.version()}`, inline: true }




            )
            console.log(os.cpus())
            message.channel.send({ embeds: [embed] })
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['info'],
    category: "other"
}