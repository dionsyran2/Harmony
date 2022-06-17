module.exports = {
    name: "loop",
    description: "Toggle the loop for the current playlist or song!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No song is playing right now")

            if (queue.repeatMode == 0) queue.setRepeatMode(1); else if (queue.repeatMode == 1) queue.setRepeatMode(2); else queue.setRepeatMode(0) 
            
            if(queue.repeatMode === null)
                return;
            // Send a message with the toggle information
            else if (queue.repeatMode == 1)
                message.channel.send('I will now repeat the song that is playing.');
            else if (queue.repeatMode == 0) message.channel.send('Repeat is now off');
            else if (queue.repeatMode == 2) message.channel.send('I will repeat the queue.');
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['loop'],
    category: "music"
}