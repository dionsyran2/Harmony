const lyricsFinder = require('../modules/lyricsModule')

module.exports = {
    name: "lyrics",
    description: "I will give you the lyrics of a song",
    run: async function (message, args, client, discord) {

        try {
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("There is nothing playing!")
            if (queue.nowPlaying == null) return message.channel.send("There is nothing playing!")

            lyricsFinder(queue.nowPlaying.name).then((data, err) => {
                err = data[1]
                data = data[0]
                if (err) return message.channel.send(data)
                data = String(data)
                data = data.replaceAll("\n", "{[lb]}")
                let strings = data.match(/.{1,1980} /g)

                for (i = 0; i < strings.length; i++){
                    message.channel.send(strings[i].replaceAll('{[lb]}', '\n'))
                }
            });
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['lyrics'],
    category: "music"

}