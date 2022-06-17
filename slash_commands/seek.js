const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Seek to a moment in the song playing')
        .addNumberOption(option =>
            option.setName('time')
                .setDescription('Time in seconds')
                .setRequired(true)
        ),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }

        let Time = interaction.options.getNumber('time')


        let queue = client.player.getQueue(interaction.guild.id);
        if (queue == null) return interaction.editReply("No music is playing right now!")
        queue.seek(parseInt(Time) * 1000);
        interaction.editReply("Operation completed successfully")
    },
};
