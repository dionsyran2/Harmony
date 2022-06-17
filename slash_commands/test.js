const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test all modules for errors!'),



	async execute(interaction, discord, client) {
        await interaction.deferReply()
        let cmds = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js') && file !== 'test.js');
        let modules = ['discord.js', '@discordjs/rest', 'discord-api-types/v9', 'discord-music-player']
        let text = ''
        for (i=0;i<modules.length;i++){
            text = `${text}\n${modules[i]}`
            interaction.editReply(text)
            if (require.cache[require.resolve(modules[i])]){
                text = `${text} :white_check_mark:`
            }else{
                text = `${text} :x:`
            }
            interaction.editReply(text)
        }

        for (i=0;i<cmds.length;i++){
            text = `${text}\n${cmds[i]}`
            interaction.editReply(text)
            if (require.cache[require.resolve(`./${cmds[i]}`)]){
                text = `${text} :white_check_mark:`
            }else{
                text = `${text} :x:`
            }
            interaction.editReply(text)
        }
	},
};
