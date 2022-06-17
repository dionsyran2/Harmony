const { SlashCommandBuilder } = require('@discordjs/builders');
const lyricsFinder = require('../modules/lyricsModule.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('See the lyrics of the song that is playing.'),
	async execute(interaction, discord, client) {
        interaction.ismessage = false
		await interaction.deferReply()
		if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }

        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("There is nothing playing!")
        if (queue.nowPlaying == null) return interaction.editReply("There is nothing playing!")

        lyricsFinder(queue.nowPlaying.name).then(data => {
            data = String(data)
            data = data.replaceAll("\n", "/n")
            let strings = data.match(/.{1,1950}/g)
            if (data == "TypeError: Cannot read properties of undefined (reading 'split')"){
                interaction.editReply("Could not get lyrics for this song!")
                return
            }
            for (i = 0; i < strings.length; i++){
                if (i == 0){
                    interaction.editReply(strings[i].replaceAll('/n', '\n'))
                }else{
                    interaction.channel.send(strings[i].replaceAll('/n', '\n'))
                }
            }
        });
        
	},
};
