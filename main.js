const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildPresences],
    partials: [User, Message, GuildMember, ThreadMember, Channel]
});

const { token } = require('./config.json');

client.commands = new Collection();

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

client.login(token).then(() => {
    loadEvents(client);
    loadCommands(client);
});