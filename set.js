const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5GRUhKNTNwQXVyaU9SVEU3WGMzVVRWUzZOaWFzQ1ZlQ2UyYXNHY0gxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3NUTjVLRGhkT2JNNlE0eXo1VVRDbzFPMm9lSmZXRkxYYnVGdnNqYjNnYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSCtHczNXZHJZRVdCZnc0emVad1BjMWtNMmVBVDVqQ3p2SUF0TVZYQ21rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNZkh1QUxoUWQ3eVE4KzZ4T3BCOTBadXR6UWhIbjdSRlhUT0VvSkQxeXk4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhKblJnQ3R3WFJyQWdaUnNPVjBOWVdiRDdrb0kwbkhrWkk3VEtNOGNxMDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1jTjF1VFBtVE9jV1BxUWpFVEdDTW1wMjZlOExjdDVyamFPRS9lRSt3eEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUpYVVRsVjRjOUk3M0Q1ZndEdmx1cUwweXFsbHptNVpneFowaFY2WnIzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzZtVy9oK2p2UnZDdGtYNThCamw0N3BZM1ZzRlI5ZzFpRDExUFRiV1dBQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZSSHpINXVQUWNKem0xdmR6Ynh4Vm9BMWdlTC9nNFFCc2F2Zk1kRzg5RVVDSkRYTVUyVDVIVVI5dFZsZG51b29tTm5NTlRVOEExaWV0cmpkcXZVL2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJkNjlXSjVVMXZVVTF5QmhGMk9ESFFQOSttUitrTFY4cytrMW9MczZVbSswPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHOV9yaUNvOFJabW96dzVvZXdtN2ZRIiwicGhvbmVJZCI6IjZmYzgxYmEyLWFmNjAtNGQ5Ni1hNGE3LTQ3YWQ4Y2NiMzZjMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1VnpERFJrWmNpNnZ3ZnhNWllEejExMU9xcE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGRSM0RUNmNmU2F0dDhZdFdTR2wrWGdQYmw4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRBUEc1NVNIIiwibWUiOnsiaWQiOiI5MjMwNDgxNzk0MTg6MjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01DTGxkVURFSUQvbmJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InBVZE1SaW9TSXBySGNwcGNabXI0ckc2aXRwSitZU1Aybmd5clFUdUdSMmc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imh6UGd5dlYwdUdvWDZqNEdpb2t0SjhmVklnaUZhVWFuT1A2NFdjTzRtaC9aK1Z3RFkrZzJhNW5qK0d2TWdLWHhFYmZKNFcyazg5bVVSTkNJRHpET0N3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYbEFiZlVab3h2TlBPR2JRSmo3YlJxSU9BZEVLc1NvQTZ5NDFSMk1sSktSZU1XMWVXbG5Wb0VZdVhhc3NXdkJJaGJvcGtrRk9FaE5aenR6MlJIMlNqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA0ODE3OTQxODoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhVkhURVlxRWlLYXgzS2FYR1pxK0t4dW9yYVNmbUVqOXA0TXEwRTdoa2RvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMjUzMTk3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUx4TSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "꧁♡❤𝐈𝐒𝐑𝐀𝐑 𝐔𝐌𝐀𝐑𝐈♡❤꧂",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "923048179418", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'UMARI-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
