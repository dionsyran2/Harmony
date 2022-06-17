module.exports = {
    name: "volume",
    description: "Set the volume!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }

            if (isNaN(parseInt(args[0]))) {
                return message.channel.send(`You must specify the volume!`)
              }
              if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0) {
                return message.channel.send("The volume must be from 0 to 100!")
              }
              let queue = client.player.getQueue(message.guild.id);
              if (queue == null) return message.channel.send("No music is playing right now!")
              let isDone = queue.setVolume(parseInt(args[0]));
              if (isDone)
                message.channel.send(`Volume set to ${args[0]}%!`);
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['volume'],
    category: "music"
}