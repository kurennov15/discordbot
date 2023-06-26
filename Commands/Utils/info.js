const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cpuStat = require('cpu-stat')
const formatBytes = require('format-bytes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Отправляет информацию о боте'),

    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 8640000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;

        cpuStat.usagePercent(function (error, percent) {
            if(error) return interaction.reply({ content: `${error}`, ephemeral: true });

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
            const node = process.version;
            const cpu = percent.toFixed(2);

            const embed = new EmbedBuilder()
                .setColor('#cdd6f4')
                .setTitle('Информация о боте')
                .addFields(
                    { name: "Разработчик", value: "kurya", inline: true },
                    { name: "Имя пользователя", value: `${client.user.username}`, inline: true },
                    { name: "ID", value: `${client.user.id}`, inline: true },
                    { name: "Дата создания", value: `19.06.2023`, inline: true },
                    { name: "Версия node", value: `${node}`, inline: true },
                    { name: "Использование CPU", value: `${cpu}%`, inline: true },
                    { name: "Использование памяти", value: `${memoryUsage}`, inline: true },
                    { name: "Время работы", value: `\`${days}\` Дней \`${hours}\` часов \`${minutes}\` минут \`${seconds}\` секунд.`, inline: true },
                )
                .setTimestamp()

            interaction.reply({
                embeds: [ embed ]
            })
        })
    }
}