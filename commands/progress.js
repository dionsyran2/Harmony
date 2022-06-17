module.exports = {
    name: "progress",
    description: "See the progress of a song!",
    run: async function (message, args, client, discord) {

        try {
            if (!message.member.voice.channel) {
                message.reply("You must be in a voice channel to use this!")
                return
            }
            
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No music is playing right now!")
            let progressBar = queue.createProgressBar({
                size: 30,
                block: '<:base:976516675266564106>',
                arrow: '<:arrow:976516771639087184>'
            });
            if (progressBar)
                message.channel.send(progressBar.prettier.replace(/<:base:976516675266564106>/,'<:base2:976517513246564392>'));
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['progress'],
    category: "music"
}