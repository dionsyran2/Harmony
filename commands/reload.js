const Devs = require("../dev.json")

module.exports = {
    name: "reload",
    description: "This will reload all the commands",
    run: async function (message, args, client, discord) {

        try {
            if (Devs.find(i => i == message.member.id)){
                client.LoadCmds()
                message.channel.send("Reloading")
            }
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['reload'],
    category: "hidden"
}