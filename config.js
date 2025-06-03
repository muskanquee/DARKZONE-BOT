const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG: prosess.env.ALIVE_IMG || "https://files.catbox.moe/gs054b",
ALIVE_IMG: prosess.env.ALIVE_IMG || " Hello, im alive now ",     
};
