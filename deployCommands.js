const { Client, GatewayIntentBits } = require("discord.js");

const { Guilds } = GatewayIntentBits;

const client = new Client({
  intents: [Guilds]
});

const { REST, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");
const guildIds = Array.from(client.guilds.cache.values()).map(
  (guild) => guild.id
);
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, "Commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
