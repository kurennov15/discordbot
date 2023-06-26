const { Client, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')
const { ownerId } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Перезагружает бота')
        .addSubcommand(subcommand =>
            subcommand.setName('commands')
                .setDescription('Загружает команды')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('events')
                .setDescription('Загружает события')
        ),

    async execute(interaction, client) {
        const { user } = interaction;

        if (user.id != ownerId) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#f38ba8')
                        .setDescription('Команда доступна только разроботчику бота!')
                        .setTimestamp()
                ]
            });
        }

        const sub = interaction.options.getSubcommand();

        const embed = new EmbedBuilder()
            .setColor('#a6e3a1')
            .setTimestamp()

        switch (sub) {
            case "commands": {
                loadCommands(client)
                interaction.reply({ 
                    embeds: [ embed.setDescription('Команды перезагружены! ✅') ],
                    ephemeral: true
                }
                )
                console.log(`${user.username} Перезагрузил команды`)
            }
            break;

            case "events": {
                loadEvents(client)
                interaction.reply({ 
                    embeds: [ embed.setDescription('События перезагружены! ✅') ],
                    ephemeral: true,
                }
                )
                console.log(`${user.username} Перезагрузил события`)
            }
            break;
        }
    }
}