module.exports = {
    name: "deleteclass",
    category: "virtual-school",
    description: "Remove a class that has been created",
    usage: "<class name> {<class name>}",
    run: async (client, message, args) => {

        var logMsg = ''

        for (i = 0; i < args.length; i++) {

            const className = args[i].toLowerCase();

            const classCategory = await message.guild.channels.cache.find(c => c.name.toLowerCase() == className && c.type == "category");

            if (classCategory == undefined) {
                logMsg = logMsg + `${i + 1}: **${className.toUpperCase()} does not exist**\n`
            } else {
                await classCategory.children.forEach(channel => channel.delete());
    
                await classCategory.delete();
    
                const classRole = await message.guild.roles.cache.find(r => r.name.toLowerCase() == className).delete()
                
                if (i + 1 < args.length) {
                    logMsg = logMsg + `${i + 1}: ${className.toUpperCase()} removed\n`
                } else {
                    logMsg = logMsg + `${i + 1}: ${className.toUpperCase()} removed`
                }
            }
        }

        message.channel.send(logMsg);
    }
}