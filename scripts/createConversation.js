const config = require('../config/config');
const client = require('twilio')(config.accountSid, config.authToken);

(async () => {
    
    const convo = await client.conversations.services(config.conversationServiceSid).conversations.create({
        friendlyName: 'Friendly Conversation',
        uniqueName: 'friendly_convo3',
    });
    const participant = await client.conversations.services(config.conversationServiceSid)
    .conversations(convo.sid).participants.create({ identity: 'jfischelli' });
    
    console.log({
        convo,
        participant
    });

})();