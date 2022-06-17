const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('See my ping!'),
	async execute(interaction, discord, client) {
		await interaction.deferReply()
		await interaction.editReply('🏓 pong')
		interaction.editReply(`🏓 pong ${'`'}${Date.now() - interaction.createdTimestamp}ms${'`'}`)
	},
};
