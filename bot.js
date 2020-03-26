const { Client, RichEmbed, Collection } = require('discord.js');

const client = new Client({
  disableEveryone : true // Disables bot's functionality to @everyone
});

client.commands = new Collection();
client.aliases = new Collection();

bellTimes = [
  (new Date()).setHours(8, 0, 0, 0),
  (new Date()).setHours(8, 0, 0, 0),
  (new Date()).setHours(8, 0, 0, 0),
  (new Date()).setHours(8, 0, 0, 0),
  (new Date()).setHours(8, 0, 0, 0),
  ];

bellMessages =
  [
    "Prepare for period 1",
    "Prepare for period 2",
    "Prepare for period 3",
    "Prepare for period 4",
    "Prepare for period 5",
    "Prepare for period 6"
  ];

    ["command"].forEach(handler => { require(`./handler/${handler}`)(client); });

client.on('ready', () => {
  client.user.setActivity('virtual classrooms', { type : 'WATCHING' });
  console.log('Online.');

  for (i = 0; i < 7; i++) {
  }
  setTimeout(function() { // in leftToEight() milliseconds run this:
    bellMessage();        // send the message once
    var dayMillseconds = 1000 * 60 * 60 * 24;
    setInterval(function() { // repeat this every 24 hours
      sendMessage();
    }, dayMillseconds)
  }, timeCalculator())
});

client.on('message', async message => {
  const prefix = "_";

  if (message.author.bot)
    return;
  if (!message.guild)
    return;
  if (!message.content.startsWith(prefix))
    return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.member.hasPermission([ 'KICK_MEMBERS' ]))
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0)
    return;

  let command = client.commands.get(cmd);
  if (!command)
    command = client.commands.get(client.aliases.get(cmd));

  if (cmd == 'student' || cmd == 'teacher') {
    if (args.length > 11) {
      message.channel.send('There is a limit of 10 parameters')
      return;
    }
  } else if (args.length > 10) {
    message.channel.send('There is a limit of 10 parameters')
    return;
  }

  if (command) {
    var logChannel = await message.guild.channels.cache.find(
      c => c.name.toLowerCase() == "log" && c.type == "text");
    logChannel.send(
      `${message.member.id}, in ${message.channel}: ${cmd} ${args}`)
    command.run(client, message, args);
  }

  // UNFINISHED
  function timeCalculator(hours, minutes)
  {
    var d = new Date();
    return (-d + d.setHours(hours, 0, 0, 0));
  }

  function bellMessage(bellString)
  {
    var guild = client.guilds.get('guildid');
    if (guild && guild.channels.get('channelid')) {
      guild.channels.get('channelid').send("Good Morning");
    }
  }
});

  client.login(process.env.BOT_TOKEN);




  