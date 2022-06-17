const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the queue'),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }

        let queue = client.player.getQueue(interaction.guild.id);
            if (queue == null) return interaction.editReply("No music is playing right now!")
            queue.stop();
            interaction.editReply('Music has stopped and the playlist has been cleared!');
    },
};
