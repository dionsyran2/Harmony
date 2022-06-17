const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes a song from the playlist.')
        .addNumberOption(option =>
            option.setName('index')
                .setDescription('Index of the song. (You can get this from /playlist)')
                .setRequired(true)
        ),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        if (!interaction.member.voice.channel) {
            interaction.editReply("You must be in a voice channel to use this!")
            return
        }
        let queue = client.player.getQueue(interaction.guild.id);
        let SongID = interaction.options.getNumber('index')
        let song = await queue.remove(SongID-1);
        if (song) {
            interaction.editReply(`Removed song ${song.name} (${args[0]}) from the playlist!`);
        }else{
            interaction.editReply("Invalid Index!")
        }
    },
};
