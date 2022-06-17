module.exports = {
    name: "uptime",
    description: "See my uptime!",
    run: async function (message, args, client, discord) {

        try {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let embed = new discord.MessageEmbed()
            embed.setAuthor(`Uptime:`)
            embed.addField(`${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`, "\u200B")
            embed.setTimestamp()
            embed.setColor("#0097FF")
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['uptime'],
    category: "other"
}