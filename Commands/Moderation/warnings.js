const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const sql = require('sqlite3');
const { ownerId } = require('../../config.json')

const db = new sql.Database('./Databases/warns.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Отображает все предупреждения пользователя на текущем сервере')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(false)
        ),

        async execute(interaction) {
            let user = interaction.options.getUser('user') || interaction.user || interaction.guild.members.cache.get(args[0]);
            let guild = interaction.guild;
            
            if (interaction.user.id != ownerId) {
                return interaction.reply({
                    content: 'Недостаточно прав',
                    ephemeral: true
                });
            }

            db.all(`SELECT * FROM warns WHERE guild_id = '${guild.id}' AND user_id = '${user.id}'`, (err, rows) => {
                if (err) {
                    return console.error(err.message);
                }
                if (rows.length == 0) {
                    const embed = new EmbedBuilder()
                        .setColor('#a6e3a1')
                        .setTitle(`Предупреждения пользователя ${user.username}:`)
                        .setDescription('Предупреждений не имеется.')
                        .setThumbnail(user.displayAvatarURL({ dinamic: true, size: 4096 }))
                        .setFooter({
                            text: `Вызвал пользователь: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({ dinamic: true, size: 4096 })
                        })
                        .setTimestamp()

                    interaction.reply({
                        embeds: [embed],
                    })
                } else {
                    const warnings = rows.map(row => `${row.id}) Причина: ${row.reason}. Дата: ${row.timestamp}.\n`);

                    const modTag = rows[0].mod_tag
                    const modAvatar = rows[0].mod_avatar
                    
                    const embed = new EmbedBuilder()
                        .setColor('#f9e2af')
                        .setTitle(`Предупреждения пользователя ${user.username}:`)
                        .setDescription(warnings.join('\n'))
                        .setThumbnail(user.displayAvatarURL({ dinamic: true, size: 4096 }))
                        .setFooter({ text: `Ответственный модератор: ${modTag}`, iconURL: modAvatar })
                        .setTimestamp()

                    interaction.reply({
                        embeds: [embed],
                    })
                }
            });
        }
}