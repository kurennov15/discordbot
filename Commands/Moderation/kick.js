const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Исключает пользователя из сервера')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('reason')
                .setDescription('Причина, по которой пользователь будет исключен')
                .setRequired(false)
        ),

        async execute(interaction, client) {
            const user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
            const member = interaction.guild.members.cache.get(user.id);
            const reason = interaction.options.getString('reason');

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply({
                    content: 'Недостаточно прав',
                    ephemeral: true
                });
            }

            if (!reason) {
                const embedSucess = new EmbedBuilder()
                    .setColor('#a6e3a1')
                    .setDescription(`Пользователь "${user.username}" успешно исключен без указанной причины`)
                    .setFooter({
                        text: `Вызвал: ${interaction.user.username}`,
                        iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                    })
                    .setTimestamp();
                
                return interaction.reply({
                    embeds: [embedSucess],
                    ephemeral: false
                })
            } else if (reason) {
                const embedSucess = new EmbedBuilder()
                    .setColor('#a6e3a1')
                    .setDescription(`Пользователь "${user.username}" успешно исключен по причине "${reason}"`)
                    .setFooter({
                        text: `Вызвал: ${interaction.user.username}`,
                        iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                    })
                    .setTimestamp();         
                    
                return interaction.reply({
                    embeds: [embedSucess],
                    ephemeral: false
                })
            } else if (member.id === client.user.id) {
                const embedError = new EmbedBuilder()
                    .setColor('#f38ba8')
                    .setDescription(`Невозможно исключить бота...`)
                    .setFooter({
                        text: `Вызвал: ${interaction.user.username}`,
                        iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                    })
                    .setTimestamp();
            }

            const embedError = new EmbedBuilder()
                .setColor('#f38ba8')
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
                .setColor('#a6e3a1')
                .setDescription(`Пользователь "${user.username}" успешно исключен`)
                .setFooter({
                    text: `Вызвал: ${interaction.author.username}`,
                    iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 })
                })
                .setTimestamp();

            await member.kick();

            return interaction.reply({
                embeds: [embedSucess],
                ephemeral: true
            });
        }
}