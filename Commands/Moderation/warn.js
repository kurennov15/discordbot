// Writing a warn command with discord.js v14

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const sql = require('sqlite3');

// Creating database file

const db = new sql.Database('../../Databases/warns.db');

// Creating table
db.run(`CREATE TABLE IF NOT EXISTS warns (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    guild_id TEXT,
    reason TEXT
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

        async execute(interaction, sql) {
            let user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
            let reason = interaction.options.getString('reason');

            if (!interaction.member.roles.cache.has('1122851329975521280')) {
                return interaction.reply({
                    content: 'Недостаточно прав',
                    ephemeral: true
                });
            }


        }
}