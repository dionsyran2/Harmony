function chunk(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i + len));
        i = i + len
    }
    return chunks;
}
module.exports = {
    name: "playlist",
    description: "See the current playlist!",
    run: async function (message, args, client, discord) {

        try {
            let queue = client.player.getQueue(message.guild.id);
            if (queue == null) return message.channel.send("No music is playing right now!")
            let tables = queue.songs
            tables = await chunk(queue.songs, 24)
            let embeds = []
            for (index = 0; index < tables.length; index++) {
                let table = tables[index]
                let Embed = new discord.MessageEmbed()
                embeds.push(Embed)
                Embed.setTitle("Playlist")
                Embed.setColor(client.MusicColor)
                Embed.setTimestamp()

                let currentsong = queue.nowPlaying;
                if (currentsong == null) return;
                if (index == 0){
                    Embed.addField(`Now Playing: ${currentsong.name} | ${currentsong.author}`, "\u200B", false)
                }
                
                for (i = 0; i < table.length; i++) {
                    let song = table[i]
                    Embed.addField(`#${i + 1} ${song.name} | ${song.author}`, "\u200B", false)
                }
            }
            message.channel.send({ embeds: embeds })
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['playlist'],
    category: "music"
}