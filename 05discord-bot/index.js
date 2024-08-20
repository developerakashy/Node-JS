import { Client, GatewayIntentBits } from "discord.js"
import shortid from "shortid";
import dotenv from "dotenv";
dotenv.config()


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on('messageCreate', (message) => {
    if(message.author.bot) return

    if(message.content.startsWith("create")){
        const url = message.content.split('create')[1]

        message.reply({
            content: "Generated ShortId -" + shortid.generate() + "-" + url
        })

        return
    }
    message.reply({
        content: "Hi from bot"
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

client.login(process.env.TOKEN)
