const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('progress')
		.setDescription('See the song progress.'),
	async execute(interaction, discord, client) {
		await interaction.deferReply()
		if (!interaction.member.voice.channel) {
            interaction.reply("You must be in a voice channel to use this!")
            return
        }
        
        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("No music is playing right now!")
        let progressBar = queue.createProgressBar({
            size: 25,
            block: '<:base:976516675266564106>',
            arrow: '<:arrow:976516771639087184>'
        });

      
        if (progressBar){
            interaction.editReply(progressBar.prettier.replace(/<:base:976516675266564106>/,'<:base2:976517513246564392>').replace(/ /ig, '      '))
        }
	},
};
