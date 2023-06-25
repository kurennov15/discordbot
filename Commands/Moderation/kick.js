const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Исключает пользователя из сервера')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(true)
        ),

        async execute(interaction, client) {
            const user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
            const member = interaction.guild.members.cache.get(user.id);

            if (!member) {
                return interaction.reply({ 
                    content: 'Пользователь не найден',
                    ephemeral: true
                });
            }

            if (member.id === interaction.user.id) {
                return interaction.reply({
                    content: 'Намерился исключить самого себя? Смельчак...',
                    ephemeral: true
                });
            }

            if (member.id === interaction.guild.ownerId) {
                return interaction.reply({
                    content: 'Исключить овнера? Гений...',
                    ephemeral: true
                });
            }

            if (member.id === client.id) {
                return interaction.reply({
                    content: 'Бот не может исключить самого себя...',
                    ephemeral: true
                });
            }

            const embedError = new EmbedBuilder()
                .setColor('#cdd6f4')
                .setDescription(`Невозможно исключить пользователя "${user.username}", так как его роль выше вашей`)
                .setFooter({
                    text: `Вызвал: ${interaction.user.username}`,
                    iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                })
                .setTimestamp();

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({
                    embeds: [embedError],
                    ephemeral: true
                });
            }

            const embedSucess = new EmbedBuilder()
                .setColor('#cdd6f4')
                .setDescription(`Пользователь "${user.username}" успешно исключен`)
                .setFooter({
                    text: `Вызвал: ${interaction.author.username}`,
                    iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                })
                .setTimestamp();

            await member.kick();

            return interaction.reply({
                embeds: [embedSucess],
                ephemeral: true
            })
        }
}