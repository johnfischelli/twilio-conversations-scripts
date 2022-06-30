const config = require('../config/config');
const jwt = require('jsonwebtoken');

const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
const twilioAccountSid = config.accountSid;
const twilioApiKey = config.twilioApiKey;
const twilioApiSecret = config.twilioApiSecret;

// Used specifically for creating Chat tokens
const serviceSid = config.conversationServiceSid;
const identity = process.argv[2];

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
    {
        ttl: 3600 * 24,
        identity: identity
    }
);

token.addGrant(chatGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());

const verify = jwt.verify(token.toJwt(), twilioApiSecret);
console.log({ verify });