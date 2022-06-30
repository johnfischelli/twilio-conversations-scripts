const config = require('../config/config');
const client = require('twilio')(config.accountSid, config.authToken);


(async () => {
    const messages = await client.conversations.services(config.conversationServiceSid)
        .conversations('')
        .messages
        .list({ order: 'desc', limit: 20 });
    console.log(messages)
})();