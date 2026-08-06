const TelegramBot = require('node-telegram-bot-api');

// Your Bot Token
const TOKEN = process.env.BOT_TOKEN || '8720912491:AAFoA9KXtiTZV2eK0Mzn0elb_Bt8NngmusE';
const bot = new TelegramBot(TOKEN, { polling: true });

// Mini App WebApp URL (Replace with your actual Vercel link)
const WEB_APP_URL = 'https://your-vercel-app-url.vercel.app';

// 1. Command: /start (With custom welcome text and two stacked buttons)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const welcomeText = `hi welcome 💐🧱to the @wrictsbot offical bot from platform @Wricts kindly launch the Mini app which is showing here ↙️`;

    bot.sendMessage(chatId, welcomeText, {
        reply_markup: {
            inline_keyboard: [
                // First Button: Opens your Mini App
                [{ text: "Open Wrict", web_app: { url: WEB_APP_URL } }],
                // Second Button: Links to your community channel
                [{ text: "Join Wrict community", url: 'https://t.me/wrict' }]
            ]
        }
    });
});

// 2. Command: /admin (Admin Moderation Panel)
bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '⚙️ *Wricts Admin Panel*\n\nUse this panel to moderate ads and update Mini App links.', {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "🗑️ Clear Bad Ads", callback_data: "clear_ads" }],
                [{ text: "📢 Update Buy Ad Banner", callback_data: "update_banner" }]
            ]
        }
    });
});

// 3. Group Chat Auto-Reply Feature (Triggers whenever someone types "wrict" or asks what's going on)
bot.on('message', (msg) => {
    if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
        if (!msg.text) return;
        
        const text = msg.text.toLowerCase();

        // Triggers if the word "wrict" appears anywhere or if they ask what's going on
        if (text.includes('wrict') || text.includes("what's going on") || text.includes('whats going on')) {
            const favorableReplies = [
                "Everything is going great! @wrictsbot is the best tool for usernames and NFT collectibles, and the @wricts community is the absolute best! 🚀",
                "Nothing much, just chilling! Though @wrictsbot is hands down the best platform out there, backed by the amazing @wricts community. 🔥",
                "Things are awesome! If you're trading usernames or anonymous numbers for free, @wrictsbot has got you covered. Best community ever: @wricts! 💎"
            ];
            
            const randomReply = favorableReplies[Math.floor(Math.random() * favorableReplies.length)];
            
            bot.sendMessage(msg.chat.id, randomReply, {
                reply_to_message_id: msg.message_id
            });
        }
    }
});

console.log('Wricts Admin Bot is running...');
