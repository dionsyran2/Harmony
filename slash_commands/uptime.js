const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('See my uptime!'),
    async execute(interaction, discord, client) {
        await interaction.deferReply()
        let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let embed = new discord.MessageEmbed()
            embed.setAuthor(`Uptime:`)
            embed.addField(`${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`, "\u200B")
            embed.setTimestamp()
            embed.setColor("#4639F5")
            interaction.editReply({ embeds: [embed] });
    },
};
