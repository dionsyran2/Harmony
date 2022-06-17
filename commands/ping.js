module.exports = {
    name: "ping",
    description: "See my ping!",
    run: async function (message, args, client, discord) {

        try {
            let message2 = await message.reply(`Pong`);
            message2.edit(`Pong ${"`"}${message2.createdTimestamp - message.createdTimestamp}ms${"`"}`)
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['ping', 'latency'],
    category: "other"
}