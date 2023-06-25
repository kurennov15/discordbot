const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Выводит пинг бота'),

    async execute(interaction, client) {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply({ content: `Клиент: ${ping}ms | Вебсокет: ${client.ws.ping}ms` });
    }
}