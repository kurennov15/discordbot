const { CommandInteraction } = require('discord.js')

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply({ context: "Команда не существует либо больше не поддерживается" });
            }

            command.execute(interaction, client);
        } else if (interaction.isContextMenuCommand()) {
            const contextCommand = client.commands.get(interaction.commandName);

            if(!contextCommand) return;

            try {
                await contextCommand.execute(interaction, client);
            } catch (error) {
                console.error(error);
                return;
            }
        }
    },
};