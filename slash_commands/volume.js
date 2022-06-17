const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Sets the volume.')
        .addNumberOption(option =>
            option.setName('volume')
                .setDescription('The volume.')
                .setRequired(true)
        ),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }
        
        let vol = interaction.options.getNumber('volume')

        if (vol > 200 || vol < 0) {
            return interaction.editReply("The volume must be from 0 to 200!")
        }
        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("No music is playing right now!")
        let isDone = queue.setVolume(vol);
        if (isDone)
            interaction.editReply(`Volume set to ${vol}%!`);
    },
};
