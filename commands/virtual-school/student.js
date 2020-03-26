module.exports = {
    name: "student",
    category: "virtual-school",
    description: "Creates classes and adds them to student",
    usage: "<user id> <class name>",
    run: async (client, message, args) => {

        const user = await message.guild.members.cache.get(args[0]);

        var logMsg = ''

        for (i = 1; i < args.length; i++) {

            var className = args[i].toUpperCase();

            if (className.substring(2, 5) == "MAE" ) {
                logMsg = logMsg + `${i}: Overwriting MAE with MAX ...\n`

                className = className.substring(0, 4) + 'X' + className.substring(5);
            }

            if (message.guild.roles.cache.find(roles => roles.name == className)) {

                logMsg = logMsg + `${i}: ${className} already exists\n`

                const classRole = await message.guild.roles.cache.find(roles => roles.name == className)

                user.roles.add(classRole);

            } else {

                const classRole = await message.guild.roles.create({
                    data: {
                        name: className,
                        color: 'BLUE',
                    },
                });

                user.roles.add(classRole);

                const category = await message.guild.channels.create(className, {
                    type: 'category',
                    permissionOverwrites: [{
                        id: classRole.id,
                        allow: ['VIEW_CHANNEL']
                    }]
                });

                const teacherRole = await message.guild.roles.cache.find(roles => roles.name === "Teacher").id;

                if (!teacherRole) {
                    message.guild.roles.create({
                        data: {
                            name: 'Teacher',
                            color: 'MAGENTA',
                        },
                    });
                }

                message.guild.channels.create("teacher-announcements", {
                    type: 'text',
                    permissionOverwrites: [{
                        id: message.guild.id,
                        deny: ['SEND_MESSAGES'],
                    }, {
                        id: teacherRole,
                        allow: ['SEND_MESSAGES']
                    }, {
                        id: classRole,
                        allow: ['VIEW_CHANNEL']
                    }],
                    parent: category.id
                });

                message.guild.channels.create("general", {
                    type: 'text',
                    parent: category.id
                });

                message.guild.channels.create("no-mic", {
                    type: 'text',
                    parent: category.id
                });

                message.guild.channels.create("classroom-voice-chat", {
                    type: 'voice',
                    parent: category.id
                });

                logMsg = logMsg + `${i}: ${className} class created\n`
            }
        }

        const studentRole = await message.guild.roles.cache.find(roles => roles.name == "Student")

        user.roles.add(studentRole);
        logMsg = logMsg + `${i}: Added ${user} to ${studentRole} role`

        message.channel.send(logMsg);
    }
}