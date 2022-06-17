const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Repeat the song or playlist.')
        .addStringOption(option =>
            option.setName('loop')
                .setDescription('Choose what to repeat.')
                .setRequired(true)
                .addChoices(
          {name: 'Song', value: '1'},
                            {name: 'Playlist', value: '2'},
                            {name: 'None', value: '0'}
                           )
                ),
    async execute(interaction, discord, client) {
        interaction.ismessage = false
        await interaction.deferReply()

        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }
        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("No song is playing right now")

        let value = interaction.options.getString('loop')
        queue.setRepeatMode(Number(value))
        if (value == 1)
                interaction.editReply('I will now repeat the song that is playing.');
        else if (value == 0) interaction.editReply('Repeat is now off');
        else if (value == 2) interaction.editReply('I will repeat the queue.')
    }
};
