const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Показывает аватар пользователя")
        .addUserOption((option) => 
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(false)
        ),

        async execute(interaction) {
            const { channel, client, option, member } = interaction;

            let user = interaction.options.getUser('user') || interaction.user || interaction.guild.members.cache.get(args[0]);
            let userAvatar = user.displayAvatarURL({ dinamic: true, size: 4096 })

            const embed = new EmbedBuilder()
                .setColor('#2B2D31')
                .setFooter({ text: `Аватар пользователя: ${user.username}`})
                .setImage(`${userAvatar}`)

            const button = new ButtonBuilder()
                .setLabel(`Ссылка на аватар`)
                .setStyle(ButtonStyle.Link)
                .setURL(`${user.avatarURL({ dinamic: true, size: 4096 })}`);

            const row = new ActionRowBuilder()
                .addComponents(button);

            await interaction.reply({
                embeds: [embed],
                components: [row],
            });
        },
};