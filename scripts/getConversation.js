const config = require('../config/config');
const client = require('twilio')(config.accountSid, config.authToken);


(async () => {
    const conversation = await client.conversations.services(config.conversationServiceSid)
        .conversations('')
        .fetch();
    console.log(conversation)
})();