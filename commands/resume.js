module.exports = {
    name: "resume",
    description: "Resume the song currently playing!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No song is playing right now")
            if (queue.paused == false) return message.channel.send("The song is already playing")
            let song = queue.nowPlaying
            queue.setPaused(false);
            if (song) {
                message.channel.send(`${song.name} was resumed!`);
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['resume'],
    category: "music"
}