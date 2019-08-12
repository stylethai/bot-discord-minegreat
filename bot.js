const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();

bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}is online!`);
  bot.user.setActivity("Server Offline", { type: "PLAYING" });
});

bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	console.log(message.content)
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === `m`) {
		if (!args.length) return message.reply('\nคุณยังไม่ได้ชื่อช่อง\nตัวอย่าง \`!m bot\`');

		const channel = message.guild.channels.find('name', `${args[0]}`);
		if (!channel) return message.reply(`ฉันหาช่อง \`${args[0]}\` ดังกล่าวไม่พบ!`);

		channel.send(`${args.join(' ')}`);
		return message.reply(`ฉันได้ส่งข้อความไปที่ช่อง \`${args[0]}\`!\nความยาวอาร์กิวเมนต์: ${args.length}\n------------------\n${args.join(' ')}`);
	}	
});

//bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
// const channel = member.guild.channels.find(ch => ch.name === 'ยินดีต้อนรับ');
  // Do nothing if the channel wasn't found on this server
//  if (!channel) return;
  // Send the message, mentioning the member
// channel.send(`ยินดีต้อนรับ, ${member} หากต้องการเป็นสมาชิก(ชื่อเขียว)ให้พิทพ์ในห้อง \`ขอเป็นสมาชิก\``);
//});

bot.on("guildMemberAdd", (member) => {

    // WELCOME Channel
    let channel = member.guild.channels.find('name', 'ยินดีต้อนรับ');
    //let memberavatar = member.user.avatarURL;
    if (!channel) return;

//    var joinrole = member.guild.roles.find('name', '✔ Members');
//    member.addRole(joinrole);

    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        // .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | ยินดีต้อนรับ  : ', `${member}`)
        .addField(':microphone2: | หากต้องการเป็นสมาชิก ให้พิทพ์ในห้องขอเป็นสมาชิกว่า >ขอเป็นสมาชิก', " Botจะให้ยศคุณเอง ")
        .setFooter(`>>> ${member.guild.name} <<< `)
        .setTimestamp()

    channel.send(embed);

    // Administrator Channel 
    let channelAdmin = member.guild.channels.find('name', 'audit-log-join');
	let memberavatar = member.user.avatarURL;

    if (!channelAdmin) return;

    let embedAdmin = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.avatarURL)
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        //.addField(':bust_in_silhouette: | User Logon : ', )
        .addField(':id: | User ID', `${member.user.id}`)
        .setFooter(`>>> ${member.guild.name} <<< `)
        .setTimestamp()
    channelAdmin.send(embedAdmin);
});
