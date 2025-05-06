module.exports.config = {
	name: "stop",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Restart Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} 𝙊𝙆𝙔 𝙁𝘼𝙃𝙄𝙈 𝙏𝙊𝙍 𝙅𝙉𝙊 𝙎𝙐𝘿𝙐 𝘾𝙐𝙋 𝙃𝙊𝙄𝙇𝘼𝙈 😕...`, threadID, () => process.exit(1));
}