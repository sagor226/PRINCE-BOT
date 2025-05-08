module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100070294402719") {
    var aid = ["100070294402719"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Wo Busy H mujhe Bolo Kya Bolna H?", "Kya Hua Boss ko q Bula Rhe Ho?", "𝗢𝗥𝗘𝗘 𝗗𝗔𝗜𝗞𝗛𝗢 𝗡𝗔 𝗣𝗟𝗦 😢😢", "𝗙𝗔𝗛𝗜𝗠 𝗧𝗢𝗛 𝗖𝗢𝗟𝗘 𝗚𝗔𝗦𝗘 😢"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }