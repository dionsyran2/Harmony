const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the playlist!'),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }

        let queue = client.player.getQueue(interaction.guild.id);
            if (queue == null) return interaction.channel.send("No music is playing right now!")
            let songs = queue.shuffle();
            if (songs)
                interaction.editReply('Server Playlist was shuffled.');
    },
};
