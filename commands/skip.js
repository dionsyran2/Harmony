module.exports = {
    name: "skip",
    description: "Skip to the next song in the playlist!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No music is playing right now!")
            let song = queue.skip();
            if (song) {
                message.channel.send(`${song.name} was skipped!`);
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['skip'],
    category: "music"
}