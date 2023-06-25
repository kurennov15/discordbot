const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('Показывает информацию о сервере'),

        async execute(interaction) {
            const guild = interaction.guild;

            if (!guild) return interaction.reply({ content: 'Сервер не найден', ephemeral: true });

            const owner = await interaction.guild.fetchOwner()

            const guildCreatedAt = interaction.guild.createdAt;
            const guildTimestamp = `<t:${Math.floor(guildCreatedAt.getTime() / 1000)}:F>`;

            const embed = new EmbedBuilder()
                .setColor('#cdd6f4')
                .setFooter({ text: `Аватар сервера: ${guild.name}` })
                .setImage(`${guild.iconURL({ dinamic: true, size: 4096 })}`)
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dinamic: true, size: 4096 })}` })
                .addFields(
                    { name: `ID`, value: `${guild.id}`, inline: true },
                    { name: `Владелец`, value: `${owner}`, inline: true },
                    { name: `Дата создания`, value: `В ${guildTimestamp}` },
                )
                .setTimestamp();

            interaction.reply({
                embeds: [embed]
            });
        }
}