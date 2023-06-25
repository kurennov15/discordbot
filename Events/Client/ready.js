const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setPresence({
      activity: {
        name: "Клиент",
        type: ActivityType.Watching,
      },
    });
    
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
    console.log(`Клиент ${client.user.tag} запущен!`);
  },
};
