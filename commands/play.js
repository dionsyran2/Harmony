module.exports = {
    name: "play",
    description: "This will play a song or add it to the playlist",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            if (!args[0]) {
                message.reply("You need to provide a song title or playlist url!")
                return;
            }


            args = args.join(' ')
            console.log(args)
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) queue = client.player.createQueue(message.guild.id);
            queue.setData({
                'message': message
            })

            if (args.search("/playlist") !== -1) {
                await queue.join(message.member.voice.channel)
                let song = await queue.playlist(args
                ).catch(err=>{
                    message.reply("No playlist was found!")
                })

            } else {
                await queue.join(message.member.voice.channel)
                await queue.play(args).catch(err => {message.reply("No song with that name was found"); console.log(err)})
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['play', 'addsong'],
    category: "music"
}