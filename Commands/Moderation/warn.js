// Writing a warn command with discord.js v14

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const sql = require('sqlite3');
const { ownerId } = require('../../config.json')

const db = new sql.Database('./Databases/warns.db');

db.run(`CREATE TABLE IF NOT EXISTS warns (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    guild_id TEXT,
    username TEXT,
    reason TEXT,
    mod_tag TEXT,
    mod_avatar TEXT,
    timestamp TEXT
)`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Даёт пользователю предупреждение на сервере')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('Пользователь')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('reason')
                .setDescription('Причина')
                .setRequired(false)
        ),

        async execute(interaction) {
            let user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
            let reason = interaction.options.getString('reason');
            let guild = interaction.guild;

            if (interaction.user.id != ownerId) {
                return interaction.reply({
                    content: 'Недостаточно прав',
                    ephemeral: true
                });
            }

            const interactionCreatedAt = new Date(interaction.createdTimestamp);
            const formattedDate = interactionCreatedAt.toLocaleString();

            if (!reason) {
                db.run(`INSERT INTO warns (user_id, guild_id, username, reason, mod_tag, mod_avatar, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)`, [user.id, guild.id, user.username, "Причина не была указана", interaction.user.tag, interaction.user.displayAvatarURL({ dinamic: true, size: 4096 }), formattedDate], (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    const embed = new EmbedBuilder()
                        .setColor('#f9e2af')
                        .setTitle('Предупреждение')
                        .setDescription(`Пользователь ${user.username} получил предупреждение на сервере. Причина не была указана.`)
                        .setTimestamp()

                    interaction.reply({
                        embeds: [embed],
                    })
                })
            } else {
            db.run(`INSERT INTO warns (user_id, guild_id, username, reason, mod_tag, mod_avatar, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)`, [user.id, guild.id, user.username, reason, interaction.user.tag, interaction.user.displayAvatarURL({ dinamic: true, size: 4096 }), formattedDate], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                const embed = new EmbedBuilder()
                    .setColor('#f9e2af')
                    .setTitle('Предупреждение')
                    .setDescription(`Пользователь ${user.username} получил предупреждение на сервере по причине: ${reason}`)
                    .setTimestamp()

                interaction.reply({
                    embeds: [embed],
                })
                }
            );
        }}
}