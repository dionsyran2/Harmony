const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays or adds a song to the playlist.')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('Search term or url')
                .setRequired(true)),
	async execute(interaction, discord, client) {
        interaction.ismessage = false
		await interaction.deferReply()
		if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }


        args = interaction.options.getString('search');
        console.log(args)
        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) queue = client.player.createQueue(interaction.guild.id);
        queue.setData({
            'message': interaction
        })

        if (args.search("/playlist") !== -1) {
            await queue.join(interaction.member.voice.channel)
            let song = await queue.playlist(args
            ).catch(err=>{
                interaction.editReply("No playlist was found!")
            })

        } else {
            await queue.join(interaction.member.voice.channel)
            await queue.play(args).catch(err => {interaction.editReply("No song with that name was found"); console.log(err)})
        }
	},
};
