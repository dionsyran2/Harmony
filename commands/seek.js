module.exports = {
    name: "seek",
    description: "Seek to a specific moment in the song!",
    run: async function (message, args, client, discord) {
        return
        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            if (Number(args[0] == NaN)) {
                message.reply("Please specify a time in seconds")
            } else {
                let queue = client.player.getQueue(message.guild.id);
              if (queue == null) return message.channel.send("No music is playing right now!")
                queue.seek(parseInt(args[0]) * 1000);
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['seek'],
    category: "hidden"
}