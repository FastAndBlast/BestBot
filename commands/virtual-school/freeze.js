module.exports = {
    name: "freeze",
    category: "virtual-school",
    description: "Stops conversation in the current classroom",
    run: async (client, message, args) => {

        const classCategory = message.channel.parent;
        const className = classCategory.name;
        const classRole = await message.guild.roles.cache.find(roles => roles.name === className);

        await classCategory.children.forEach(channel => {
            channel.updateOverwrite(classRole, {SEND_MESSAGES: false});
        });

        message.channel.send(`${className} has been frozen, **no students can talk in this class** until the _unfreeze command is used`);
    }
}