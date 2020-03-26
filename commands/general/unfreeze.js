module.exports = {
    name: "unfreeze",
    category: "virtual-school",
    description: "Allows conversation in the current classroom",
    run: async (client, message, args) => {

        const classCategory = message.channel.parent;
        const className = classCategory.name;
        const classRole = await message.guild.roles.cache.find(roles => roles.name === className);

        await classCategory.children.forEach(channel => {
            channel.updateOverwrite(classRole, {SEND_MESSAGES: true});
        });

        message.channel.send(`${className} has been unfrozen`);
    }
}