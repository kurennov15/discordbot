const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Avatar")
    .setType(ApplicationCommandType.User),

  async execute(interaction, client) {
    const { channel, option, member } = interaction;

    let user = interaction.options.getUser('user') || interaction.user;
    let userAvatar = user.displayAvatarURL({ dinamic: true, size: 4096 })

    const embed = new EmbedBuilder()
      .setColor('#cdd6f4')
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
