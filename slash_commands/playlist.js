function chunk(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i + len));
        i = i + len
    }
    return chunks;
}

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('See whats on the playlist!'),
	async execute(interaction, discord, client) {
		await interaction.deferReply()
		let queue = client.player.getQueue(interaction.guild.id);
        let totalI = 0
            if (queue == null) return interaction.editReply("No music is playing right now!")
            let tables = queue.songs
            tables = await chunk(queue.songs, 24)
            let embeds = []
            for (index = 0; index < tables.length; index++) {
                let table = tables[index]
                let Embed = new discord.MessageEmbed()
                embeds.push(Embed)
                Embed.setTitle("Playlist")
                Embed.setColor('#4639F5')
                Embed.setTimestamp()

                let currentsong = queue.nowPlaying;
                if (currentsong == null) return;
                if (index == 0){
                    Embed.addField(`Now Playing: ${currentsong.name} | ${currentsong.author}`, "\u200B", false)
                }
                
                for (i = 0; i < table.length; i++) {
                    let song = table[i]
                    totalI++
                    Embed.addField(`#${totalI} ${song.name} | ${song.author}`, "\u200B", false)
                }
            }
            interaction.editReply({ embeds: [embeds[0]] })
            for (i=1; i<embeds.length; i++){
                interaction.channel.send({ embeds: [embeds[i]] })
            }
	},
};
