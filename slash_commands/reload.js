const Devs = require("../dev.json")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all the commands.'),
	async execute(interaction, discord, client) {
        await interaction.deferReply()
		if (Devs.find(i => i == interaction.member.id)){
            interaction.editReply("Reloading...")
            client.LoadSlashCmds()
            interaction.editReply("<:cm:939142657194733578> Reloaded Successfully!")
        }else{
            interaction.editReply('Only the developers can use this!')
        }
	},
};