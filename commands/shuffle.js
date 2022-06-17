module.exports = {
    name: "shuffle",
    description: "Shuffle the playlist!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No music is playing right now!")
            let songs = queue.shuffle();
            if (songs)
                message.channel.send('Server Playlist was shuffled.');
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['shuffle'],
    category: "music"
}