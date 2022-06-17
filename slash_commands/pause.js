const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the song playing.'),
	async execute(interaction, discord, client) {
		await interaction.deferReply()
		if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }
        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("No song is playing right now")
        if (queue.paused == true) return interaction.editReply("The song is already paused")
        let song = queue.nowPlaying
        queue.setPaused(true);
        if (song) {
            interaction.editReply(`${song.name} was paused!`);
        }
	},
};
