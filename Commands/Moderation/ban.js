const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Банит пользователя на сервере')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('reason')
                .setDescription('Причина, по которой пользователь будет забанен')
                .setRequired(false)
        ),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                content: 'Недостаточно прав',
                ephemeral: true
            });
        }

        if (!reason) {
            const embedSucess = new EmbedBuilder()
                .setColor('#a6e3a1')
                .setDescription(`Пользователь "${user.username}" успешно забанен`)
                .setFooter({
                    text: `Вызвал: ${interaction.user.username}`,
                    iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                })
                .setTimestamp();

            return interaction.reply({
                embeds: [embedSucess],
                ephemeral: false
            });

            } else if (reason) {
                const embedSucess = new EmbedBuilder()
                    .setColor('#a6e3a1')
                    .setDescription(`Пользователь "${user.username}" успешно забанен по причине "${reason}"`)
                    .setFooter({
                        text: `Вызвал: ${interaction.user.username}`,
                        iconURL: user.displayAvatarURL({ dinamic: true, size: 4096 }),
                    })
                    .setTimestamp();
                
                return interaction.reply({
                    embeds: [embedSucess],
                    ephemeral: false
                })
            } 
        }
}