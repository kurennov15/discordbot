const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    client.guilds.cache.forEach((guild) => {
      guild.channels.cache
        .filter((channel) => channel.type === "text")
        .forEach((channel) => {
          channel.messages
            .fetch({ before: twoWeeksAgo })
            .then((messages) => {
              const botMessages = messages.filter(
                (msg) => msg.author.id === client.user.id
              );
            })
            .catch(console.error);
        });
    });
    client.user.setPresence({
      activity: {
          name: `with ${client.commands.size} commands`,
          type: ActivityType.Watching,
      },
  })

  console.log(`Клиент ${client.user.tag} запущен!`);
  },
};
