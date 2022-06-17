module.exports = {
    name: "remove",
    description: "Remove a song from the playlist!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            let SongID = Number(args[0]) - 1; // The index is starting from 0, so we subtract 1.

            if (SongID != NaN) {
                let queue = client.player.getQueue(message.guild.id);
                if (queue == null) return message.channel.send("No music is playing right now!")
                let song = queue.remove(SongID);
                if (song) {
                    message.channel.send(`Removed song ${song.name} (${args[0]}) from the playlist!`);
                }
            } else {
                console.log(SongID)
                message.channel.send("Invalid song id!")
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['remove'],
    category: "music"
}