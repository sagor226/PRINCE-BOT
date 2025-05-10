const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const YTSEARCH_API_URL = 'https://nexalo-api.vercel.app/api/ytsearch';
const YTMP3DL_API_URL = 'https://nexalo-api.vercel.app/api/ytmp3dl';

module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Hridoy",
    description: "Search and download a song as an MP3 file by its name",
    commandCategory: "music",
    usages: "[song name]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const threadID = event.threadID;
    const messageID = event.messageID;
    const senderID = event.senderID;

    let filePath;
    let videoUrl;

    try {
        const musicName = args.join(' ').trim();
        if (!musicName) {
            api.setMessageReaction("❌", messageID, () => {}, true);
            return api.sendMessage(
                `Please provide a music name. Example: ${global.config.PREFIX}sing Blinding Lights`,
                threadID,
                messageID
            );
        }

        const query = encodeURIComponent(musicName);
        const searchRes = await axios.get(`${YTSEARCH_API_URL}?query=${query}`, { timeout: 10000 });

        if (!searchRes.data || searchRes.data.code !== 200 || !searchRes.data.data.length) {
            throw new Error("No music found for the given query");
        }

        const video = searchRes.data.data[0];
        videoUrl = video.url;
        const title = video.title;
        const duration = video.duration;

        const dlRes = await axios.get(`${YTMP3DL_API_URL}?url=${encodeURIComponent(videoUrl)}`, { timeout: 10000 });
        if (!dlRes.data || !dlRes.data.success || !dlRes.data.download_url) {
            throw new Error("Failed to get MP3 download URL");
        }

        const mp3Url = dlRes.data.download_url;
        const tempDir = __dirname + "/cache";
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
        const fileName = `sing_${crypto.randomBytes(8).toString('hex')}.mp3`;
        filePath = path.join(tempDir, fileName);

        const mp3Res = await axios.get(mp3Url, { responseType: 'stream', timeout: 15000 });
        const writer = fs.createWriteStream(filePath);
        mp3Res.data.pipe(writer);
        await new Promise((res, rej) => {
            writer.on('finish', res);
            writer.on('error', rej);
        });

        const stats = fs.statSync(filePath);
        if (stats.size === 0) throw new Error("Downloaded MP3 is empty");

        const msg = {
            body: `🎧 Here's the audio for "${title}" (${duration})!`,
            attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(msg, threadID, () => {
            fs.unlinkSync(filePath);
            api.setMessageReaction("🎵", messageID, () => {}, true);
        }, messageID);

    } catch (err) {
        console.log("Sing command error:", err.message);

        api.setMessageReaction("❌", messageID, () => {}, true);
        api.sendMessage(
            `⚠️ Error: ${err.message}\nYou can try the link directly: ${videoUrl || 'Not available'}`,
            threadID,
            messageID
        );

        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
};