// 

const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Отчищает выбранное количество сообщений')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption((option) =>
            option.setName('amount')
                .setDescription('Количество сообщений')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Выбрать пользователя для удаления его сообщений')
                .setRequired(false)
        ),

        async execute(interaction) {
            const { channel, options } = interaction;

            const amount = options.getInteger('amount');
            const user = options.getUser('user');

            const messages = await channel.messages.fetch({ 
                limit: amount +1,
            });

            const embed = new EmbedBuilder()
                .setColor('#cdd6f4')

            if (user) {
                let i = 0;
                const filtered = [];

                (await messages).filter((msg) => {
                    if (msg.author.id === user.id && amount > i ) {
                        filtered.push(msg);
                        ++i;
                    }
                })

                await channel.bulkDelete(filtered).then(messages => {
                    embed.setDescription(`Удалено ${messages.size} сообщений пользователя ${user}.`);
                    interaction.reply({
                        embeds: [embed], ephermeral: true
                    });
                })
            } else {
                await channel.bulkDelete(amount).then(messages => {
                    embed.setDescription(`Удалено ${messages.size} сообщений.`);
                    interaction.reply({
                        embeds: [embed], ephermeral: true
                    });
                })
            }
        },
};
