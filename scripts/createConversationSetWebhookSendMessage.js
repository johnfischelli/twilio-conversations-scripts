const config = require('../config/config');
const client = require('twilio')(config.accountSid, config.authToken);


(async () => {
    const conversation = await client.conversations.services(config.conversationServiceSid)
        .conversations.create({
            friendlyName: 'Webhook Message Test'
        });

    const webhooks = await client.conversations.services(config.conversationServiceSid)
        .conversations(conversation.sid)
        .webhooks.create({
            'configuration.method': 'GET',
            'configuration.filters': ['onMessageAdded'],
            'configuration.url': '',
            target: 'webhook'
        });
    
    console.log(conversation)
    console.log(webhooks);

    const message = await client.conversations.services(config.conversationServiceSid)
        .conversations(conversation.sid)
        .messages
        .create({ author: 'smee', body: 'Ahoy there!', xTwilioWebhookEnabled: true });
    
    console.log(message);
})();