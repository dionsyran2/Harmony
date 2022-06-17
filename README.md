# Make your own music bot!

<img src="https://camo.githubusercontent.com/f86c1d7af96ad6fa88cd390ce47ead4e668ae2e9b60cc5ffd41c9c8ed4101847/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f617661746172732f3833363931313137333939303837353133372f34393232383338343634303735373963653637393939646164303334363633632e706e673f73697a653d34303936" alt="" data-canonical-src="https://cdn.discordapp.com/avatars/836911173990875137/492283846407579ce67999dad034663c.png?size=4096" width="150" height="150">

### Apps you will need:
* [Node.js](https://nodejs.org/en/download/): The programming language used to make this bot.
* [Visual Studio Code](https://code.visualstudio.com/download) or any code editor.


### Creating the workspace.
1. Create a new folder with the name of your choise.
2. [Download](https://github.com/dionsyran2/Harmony/archive/refs/heads/main.zip) all the files as zip.
3. Move the downloaded zip into the folder you made.
![](https://i.imgur.com/NI70JCN.png)
4. Move all the files from the folder "Harmony-main" to the folder you made.
5. Open the folder you made with your favorite code editor.
(For Visual Studio Code press `Ctrl + K` and select the folder you made).
6. Open the console and go to the folder you made using the command `cd C:/PathToMyFolder` (or in visual studio code press `Ctrl + ~`, no need to use `cd`) and type `npm i`.
7. Press `enter` and wait for it to finish.
![](https://i.imgur.com/Zv0jEH9.png)

### Create the bot.
1. Go to the [discord developer page](https://discord.com/developers/applications).
2. Click on **New application** and give it a name.
![](https://i.imgur.com/bMhy0yY.png)
3. Go to **Bot** and Add Bot.
![](https://i.imgur.com/dDo0DgP.png)
4. From here copy the bot's Token.

### Configure the bot.
#### config.json
1. In your code editor open the file named `config.json`.
2. Replace `YourBotTokenHere` with your bot's token.
3. Go to your bot's page from the [discord developer page](https://discord.com/developers/applications).
4. Copy the **Application ID**.
![](https://i.imgur.com/kSsr1BE.png)
5. Replace `YourBotIdHere` with the ID you just copied.

#### dev.json
This is the list of User Ids of the people who will be able to use the reload command

Put the ID's of the users who you want to be able to use the reload command, as a string (inside "") separated by commas (,) except the last one
example:
```json
[
  "123456789",
  "987654321"
]
```

#### botinfo.json
Just replace the info, you can do it. Its the info displayed when you use the **info** command


### Start your bot
1. Go to the console
2. Make sure you are inside the folder with your bot (except is you use Visual Studio Code)
3. Type `node .` and press enter.
It will display some texts and if you have done everything right, at the end you will see a message `Logged in as [Your bot's name]`

If you get any errors create a new issue!




### Normal Command Template
```js
module.exports = {
    name: "template",
    description: "template",
    run: async function (message, args, client, discord) {

        try {
            console.log('template')
        } catch (err) {
            message.channel.send(`An Unknown Error Occured: ${err}`)
        }

    },
    aliases: ['template']
}
```


### slash command template:

```js

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('template')
		.setDescription('template'),
    
	async execute(interaction, discord, client) {
  
		interaction.editReply('template')
    
	},
};

```
