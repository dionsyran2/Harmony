module.exports = {
    name: "add",
    description: "This add a playlist",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            if (!args[0]) {
                message.reply("You need to provide a playlist url!")
                return;
            }


            console.log(args)
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) queue = client.player.createQueue(message.guild.id);
            queue.setData({
                'message': message
            })

            await queue.join(message.member.voice.channel)
            let song = await queue.playlist(args
                ).catch(err=>{
                    message.reply("No playlist was found!")
                })

        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['add', 'addplaylist'],
    category: "music"
}