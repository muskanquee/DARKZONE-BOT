const express = require('express');
const fs = require('fs');
const { exec } = require("child_process");
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    let num = req.query.number;
    async function PrabathPair() {
        const { state, saveCreds } = await useMultiFileAuthState(`./session`);
        try {
            let PrabathPairWeb = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
            });

            if (!PrabathPairWeb.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await PrabathPairWeb.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            PrabathPairWeb.ev.on('creds.update', saveCreds);
            PrabathPairWeb.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    try {
                        await delay(10000);
                        const sessionPrabath = fs.readFileSync('./session/creds.json');

                        const auth_path = './session/';
                        const user_jid = jidNormalizedUser(PrabathPairWeb.user.id);

                      function randomMegaId(length = 6, numberLength = 4) {
                      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                      let result = '';
                      for (let i = 0; i < length; i++) {
                      result += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                       const number = Math.floor(Math.random() * Math.pow(10, numberLength));
                        return `${result}${number}`;
                        }

                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);

                        const string_session = mega_url.replace('https://mega.nz/file/', '');

                        const sid = string_session;

                        const dt = await PrabathPairWeb.sendMessage(user_jid, {
                            text: sid
                        });
                        
                     await delay(2000);
//after send session id msg

let tomsg = "💗   *Welcome to YOUR BOT NAME!*   💗

*ʏᴏᴜʀ ꜱᴇꜱꜱɪᴏɴ ɪᴅ ᴄᴏɴɴᴇᴄᴛ*_ 

 *ᴄᴏᴘʏ & ᴘᴀꜱᴛᴇ ᴛʜᴇ ꜱᴇꜱꜱɪᴏɴ_ɪᴅ ᴀʙᴏᴠᴇ*🛠️ ᴀᴅᴅ ɪᴅ ᴛᴏ ʏᴏᴜʀ ᴇɴᴠɪʀᴏɴᴍᴇɴᴛ ᴠᴀʀɪᴀʙʟᴇ: *ꜱᴇꜱꜱɪᴏɴ_ɪᴅ*.  

💡 *ᴡʜᴀᴛꜱ ɴᴇxᴛ?* 
1️⃣ ᴇxᴘʟᴏʀᴇ ᴀʟʟ ᴛʜᴇ ᴄᴏᴏʟ ꜰᴇᴀᴛᴜʀᴇꜱ.
2️⃣ ꜱᴛᴀʀ ᴜᴘᴅᴀᴛᴇᴅ  ᴡɪᴛʜ ᴏᴜʀ ʟᴀᴛᴇꜱᴛ ʀᴇʟᴇᴀꜱᴇꜱ ᴀɴᴅ ꜱᴜᴘᴘᴏʀᴛ.
3️⃣ ᴇɴᴊᴏʏ ꜱᴇᴀᴍʟᴇꜱꜱ ᴡʜᴀᴛꜱᴀᴘᴘ ᴀᴜᴛᴏᴍᴀᴛɪᴏɴ! 🤖  

🔗 *ᴊᴏɪɴ ᴏᴜʀ ꜱᴜᴘᴘᴏʀᴛ ᴄʜᴀɴɴᴇʟ :* 👉 [ᴄʟɪᴄᴋ ʜᴇʀᴇ ᴛᴏ ᴊᴏɪɴ](https://whatsapp.com/channel/0029Vb3U9MU1yM3S) 

 🔗 ᴊᴏɪɴ ᴏᴜʀ ꜱᴜᴘᴏᴏʀᴛ ɢʀᴏᴜᴘ :
👉 [ᴄʟɪᴄᴋ ʜᴇʀᴇ ᴛᴏ ᴊᴏɪɴ] (https://chat.whatsapp.com/FYsbo9QWv7plbmg)

®️ _ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴄʜᴏᴏꜱɪɴɢ BOT — ʟᴇᴛ ᴛʜᴇ ᴀᴜᴛᴏᴍᴀᴛɪɴ ʙᴇɢɪɴ!_ ®️"
await PrabathPairWeb.sendMessage(user_jid, {
                            text: tomsg
                        });
                       await delay(2000)
                      //auto join group (ex: support group
                  await PrabathPairWeb.groupAcceptInvite("FYsbo9QWv2K6bawEjN7plbmg") //whatsapp group id

                        
                    } catch (e) {
                        exec('pm2 restart all');
                    }

                    await delay(100);
                    return await removeFile('./session');
                    process.exit(0);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    PrabathPair();
                }
            });
        } catch (err) {
            exec('pm2 restart all');
            console.log("service restarted");
            PrabathPair();
            await removeFile('./session');
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await PrabathPair();
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    exec('pm2 restart all');
});


module.exports = router;
