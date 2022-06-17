function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const Discord = require("discord.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const discord = Discord
const Intents = new Discord.Intents([
    //Discord.Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILDS",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGES",

]);
const client = new Discord.Client({ intents: Intents });
client.MusicColor = '#4639F5'
const fs = require("fs")

const { Player } = require("discord-music-player");

const player = new Player(client, {
    leaveOnEmpty: true,
});

client.player = player

const config = require("./config.json")
let prefix = config.prefix
client.prefix = prefix
client.on("ready", async () => {
    while (true){
            client.user.setActivity(`${client.guilds.cache.size} Servers | /play`, {type: "PLAYING" });
            await sleep(10000)
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            client.user.setActivity(`uptime: ${days} ${days !== 1? 'days' : 'day'}, ${hours} ${hours !== 1? 'Hours' : 'Hour'}, ${minutes} ${minutes !== 1? 'minutes' : 'minute'}, ${seconds} ${seconds !== 1? 'seconds' : 'second'}`, { type: "PLAYING" });
            await sleep(5000)
        }
    console.log(`Logged in as ${client.user.username}`)
})



client.login(config.token);




//commands
client.LoadCmds = function () {
    client.commands = []
    const commandFiles = fs.readdirSync('./Bots/Music/commands');
    delete require.cache[require.resolve(`./commands/reload.js`)]
    client.commands.push(require(`./commands/reload.js`));
    for (const file of commandFiles) {
        if (fs.lstatSync(`./Bots/Music/commands/${file}`).isDirectory()) {
            for (const file2 of fs.readdirSync(`./Bots/Music/commands/${file}`).filter(file => file.endsWith('.js'))) {
                console.log(file2)
                if (file2 !== "reload.js") {
                    delete require.cache[require.resolve(`./commands/${file}/${file2}`)]
                    const command = require(`./commands/${file}/${file2}`);
                    client.commands.push(command);
                    if (command.setup) {
                        command.setup(client)
                    }
                }

            }
            console.log(file)
        } else {
            delete require.cache[require.resolve(`./commands/${file}`)]

            console.log(file)
            const command = require(`./commands/${file}`);

            client.commands.push(command);
        }
    }
}

client.LoadCmds()


const clientId = '836911173990875137';
client.LoadSlashCmds = function () {
    let commands = [];
    let commandFiles = fs.readdirSync('./Bots/Music/slash_commands').filter(file => file.endsWith('.js'));



    // Place your client and guild ids here

    for (const file of commandFiles) {
        delete require.cache[require.resolve(`./slash_commands/${file}`)]
        const command = require(`./slash_commands/${file}`);
        commands.push(command.data.toJSON());
    }


    let commandFilesS = fs.readdirSync('./Bots/Music/slash_commands').filter(file => file.endsWith('.js'));
    client.scommands = new discord.Collection();
    for (const file of commandFilesS) {
        console.log(file)
        const command = require(`./slash_commands/${file}`);
        client.scommands.set(command.data.name, command);
    }


    const rest = new REST({ version: '9' }).setToken(config.token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

}

client.LoadSlashCmds()



client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.scommands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, discord, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


//running commands
client.on("messageCreate", async (message) => {
    if (message.mentions.users.first() === client.user && message.type != "REPLY") {
        message.channel.send(`My prefix is: ${prefix}. To see what i can do say ${"`"}${prefix}help${"`"}`)
        return
    }
    if (!message.content.startsWith(prefix) || message.member.user.bot) return;


    const args = message.content.slice((prefix).length).trim().split(/ +/);

    const command = args.shift().toLowerCase();
    for (const cmd of client.commands) {
        for (const aliase of cmd.aliases) {
            if (aliase == command) {
                cmd.run(message, args, client, discord)
                break
            }
        }
    }


})




client.player
    .on('channelEmpty', (queue) => {
        let { message } = queue.data;
        message.channel.send(`The **${queue.connection.channel}** was empty, music was removed!`)
    })
    // Emitted when a song was added to the queue.

    // Emitted when a playlist was added to the queue.
    .on('playlistAdd', (queue, playlist) => {
        let { message } = queue.data;
        if (message.ismessage == false){
            message.editReply(`${playlist.name} playlist with ${playlist.songs.length} songs has been added to the queue!`)
        }else message.channel.send(`${playlist.name} playlist with ${playlist.songs.length} songs has been added to the queue!`)
    })
    .on('songFirst', (queue, song) => {
        const Embed = new discord.MessageEmbed()
        let { message } = queue.data;
        Embed.setAuthor(`Now playing:`, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png")
        Embed.setColor('#4639F5')
        Embed.setTitle(song.name)
        Embed.setURL(song.url)
        Embed.addFields(
            { name: 'Author', value: song.author, inline: true },
            { name: `Requested by: `, value: `${message.member.user}`, inline: true }
        )
        Embed.setThumbnail(song.thumbnail)
        Embed.setFooter("Youtube", "https://seeklogo.com/images/Y/youtube-icon-logo-05A29977FC-seeklogo.com.png")
        Embed.setTimestamp()
        message.channel.send({ embeds: [Embed] })
    })
    // Emitted when someone disconnected the bot from the channel.

    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) => {
        let { message } = queue.data;
        message.channel.send(`I got disconnected from the channel, music was removed.`)
    })
    // Emitted when there was an error with NonAsync functions.
    .on('error', (error, message) => {
        console.log(error);
        console.log(message);
        switch (error) {
            // Thrown when the YouTube search could not find any song with that query.
            case 'SearchIsNull':
                message.channel.send(`No song with that name was found.`);
                break;
            // Thrown when the provided YouTube Playlist could not be found.
            case 'InvalidPlaylist':
                message.channel.send(`No Playlist was found with that link.`);
                break;
            // Thrown when the provided Spotify Song could not be found.
            case 'InvalidSpotify':
                message.channel.send(`No Spotify Song was found with that link.`);
                break;
            // Thrown when the Guild Queue does not exist (no music is playing).
            case 'QueueIsNull':
                message.channel.send(`There is no music playing right now.`);
                break;
            // Thrown when the Members is not in a VoiceChannel.
            case 'VoiceChannelTypeInvalid':
                message.channel.send(`You need to be in a Voice Channel to play music.`);
                break;
            // Thrown when the current playing song was an live transmission (that is unsupported).
            case 'LiveUnsupported':
                message.channel.send(`We do not support YouTube Livestreams.`);
                break;
            // Thrown when the current playing song was unavailable.
            case 'VideoUnavailable':
                message.channel.send(`Something went wrong while playing the current song, skipping...`);
                break;
            // Thrown when provided argument was Not A Number.
            case 'NotANumber':
                message.channel.send(`The provided argument was Not A Number.`);
                break;
            // Thrown when the first method argument was not a discord Message object.
            case 'MessageTypeInvalid':
                message.channel.send(`The Message object was not provided.`);
                break;
            // Thrown when the Guild Queue does not exist (no music is playing).
            default:
                console.log(`**Unknown Error Ocurred:** ${error}`);
                //message.channel.send(`**Unknown Error Ocurred:** ${error}`);
                break;
        }
    });
client.player.on('clientDisconnect', (queue) => {
    let { message } = queue.data;
    const Embed = new discord.MessageEmbed()
    Embed.setAuthor(`I got disconnected from the channel, music was removed.`, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png")
    Embed.setColor('#4639F5')
    message.channel.send({ embeds: [Embed] })
});
client.player.on('songAdd', (queue, song) => {
    let { message } = queue.data;
    const Embed = new discord.MessageEmbed()
    Embed.setAuthor(`Added to queue:`, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png")
    Embed.setColor('#4639F5')
    Embed.setTitle(song.name)
    Embed.setURL(song.url)
    Embed.addFields(
        { name: 'Author', value: song.author, inline: true },
        { name: `Requested by: `, value: `${message.member.user}`, inline: true }
    )
    Embed.setThumbnail(song.thumbnail)
    Embed.setFooter("Youtube", "https://seeklogo.com/images/Y/youtube-icon-logo-05A29977FC-seeklogo.com.png")
    Embed.setTimestamp()
    if (message.ismessage == false){
        message.editReply({ embeds: [Embed] })
    }else message.channel.send({ embeds: [Embed] })
})
client.player.on('queueEnd', (queue) => {
    let { message } = queue.data;
    message.channel.send(`The queue ended, nothing more to play!`)
})

client.player.on('songChanged', (queue, newSong, oldSong) => {
    const Embed = new discord.MessageEmbed()
    let { message } = queue.data;
    Embed.setAuthor(`Now playing:`, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png")
    Embed.setColor('#4639F5')
    Embed.setTitle(newSong.name)
    Embed.setURL(newSong.url)
    Embed.addFields(
        { name: 'Author', value: newSong.author, inline: true },
        { name: `Requested by: `, value: `${message.member.user}`, inline: true }
    )
    Embed.setThumbnail(newSong.thumbnail)
    Embed.setFooter("Youtube", "https://seeklogo.com/images/Y/youtube-icon-logo-05A29977FC-seeklogo.com.png")
    Embed.setTimestamp()
    message.channel.send({ embeds: [Embed] })
})