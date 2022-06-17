module.exports = {
    name: "stop",
    description: "Stops the queue",
    run: async function (message, args, client, discord) {

        try {
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No music is playing right now!")
            queue.stop();
            message.channel.send('Music has stopped and the playlist has been cleared!');
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['stop'],
    category: "music"
}