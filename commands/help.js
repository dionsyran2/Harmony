

module.exports = {
    name: "help",
    description: "Displays this message",
    run: async function (message, args, client, discord) {

        try {
            let commands = []
            for (const cmd of client.commands) {
                if (cmd.category != "hidden") {
                    commands.push({ name: `${client.prefix}` + cmd.name, description: cmd.description, args: cmd.args })
                }
            }


            console.log(commands)
            const embed = new discord.MessageEmbed()
                .setTitle(`Help`)
                .setColor('#a5a3f5');

            for (const cmd of commands) {
                if (cmd.args != null) {
                    embed.addField(`${cmd.name} ${cmd.args}`, cmd.description, false)
                } else {
                    embed.addField(cmd.name, cmd.description, false)
                }
            }
            message.channel.send({ embeds: [embed] })

        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['help'],
    category: "hidden"
}