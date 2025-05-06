const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ullash",
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : 𝐅𝐀𝐇𝐈𝐌 ⚡
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐀𝐋𝐄
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝐈𝐧 𝐂𝐨𝐦𝐩𝐥𝐢𝐜𝐚𝐭𝐞𝐝
┃ 🎂 𝐀𝐠𝐞       : 16+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐒𝐋𝐀𝐌
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝐒𝐓𝐔𝐃𝐄𝐍𝐃
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝐃𝐇𝐀𝐊𝐀, 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : 𝐅𝐀𝐇𝐈𝐌-𝐀𝐇𝐌𝐄𝐃-77
┃ 📢  𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 : [01771240377](Fuck)
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : (https://www.facebook.com/𝐡𝐚𝐜𝐤𝐚𝐫.𝐯𝐚𝐢𝐲𝐚)
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞: 24/04/2025 11:58:34 PM
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));

    return request(encodeURI(`https://graph.facebook.com/100070294402719/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};