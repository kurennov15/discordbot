const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Отправляет информацию о пользователе')
        .addUserOption((option) => 
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(false)
        )
        .addBooleanOption((option) => 
            option.setName('guild')
                .setDescription('Информация о пользователе на сервере. Изначально: true')
                .setRequired(false)
        ),

        async execute(interaction) {
            let user = interaction.options.getUser('user') || interaction.user || (interaction.guild.members.cache.get(args[0]) || {}).user
            let userAvatar = user.displayAvatarURL({ dinamic: true, size: 4096 });

            const guild = interaction.guild;

            const member = interaction.guild.members.cache.get(user.id)
            const presence = member.presence;

            if (!presence) return;

            const clientStatus = presence.clientStatus;
            const devices = Object.keys(clientStatus)[0];

            let device = devices.includes('desktop') ? 'desktop' : devices[0];

            let deviceName = '';
            switch (device) {
                case 'desktop':
                    deviceName = 'Компьютер';
                    break;
                case 'mobile':
                    deviceName = 'Телефон';
                    break;
                case 'web':
                    deviceName = 'Веб';
                    break;
                default: 
                    deviceName = 'Не в сети';
            }

            const embed = new EmbedBuilder()
                .setColor('#cdd6f4')
                .setTitle(`Сведенья:`)
                .setThumbnail(`${userAvatar}`)
                .setAuthor({ name: `Информация об пользователе: "${user.username}"`,
                             iconURL: `${guild.iconURL({ dinamic: true, size: 512 })}`,
                             url: `${user.avatarURL({ dinamic: true, size: 4096 })}` })
                .addFields(
                    { name: `Никнейм`, value: `${user.username}`, inline: true },
                    { name: `Устройство`, value: `${deviceName}`, inline: true },
                )
                .setFooter({ 
                    text: `Запросил "${interaction.user.username}"`,
                    iconURL: `${interaction.user.avatarURL({ dinamic: true, size: 4096 })}`
                })
                .setTimestamp()

            await interaction.reply({
                embeds: [embed],
            });
        }
};