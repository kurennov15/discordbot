const { SlashCommandBuilder, Message } = require('discord.js');
const { ownerId } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('text')
        .setDescription('Отправляет текст, который ввёл пользователь')
        .addStringOption((option) =>
            option.setName('text')
                .setDescription('Текст')
                .setRequired(true)
        ),

        async execute(interaction, client) {
            /*let user = interaction.user;
            const text = interaction.options.getString('text');

            if (user.id != ownerId) {
                return interaction.reply({
                    content: 'Только создатель имеет право баловаться этой командой',
                });
            }

            interaction.channel.send({ 
                content: text
            }).then(() => {
                interaction.reply({
                    content: 'Сообщение отправлено',
                    ephemeral: true
                });
            })*/
        }
    }