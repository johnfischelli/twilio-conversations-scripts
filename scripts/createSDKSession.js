const { Client } = require('@twilio/conversations');

const token = 'abcde';

Client.create(token)
    .then(async (client) => {
        try {
            client.on('connectionError', (data) => {
                console.log({
                    message: 'Registered connectionError Listener',
                    data
                });
            });
            client.on('connectionStateChanged', (data) => {
                console.log({
                    message: 'Registered connectionStateChanged Listener',
                    data
                });
            });
            client.on('tokenAboutToExpire', () => {
                console.log({
                    message: 'Registered tokenAboutToExpire Listener',
                    data
                });
            });
            client.on('tokenExpired', () => {
                console.log({
                    message: 'Registered tokenExpired Listener',
                    data
                });
            });

            const conversation = await client.getConversationBySid('')
            conversation.on('messageAdded', (message) => {
                console.log({
                    message: 'Registered MessageAdded Listener on conversation',
                    message
                })
            });
            conversation.on('updated', (data) => {
                console.log({
                    message: 'Registered Updated Listener on conversation',
                    data
                })
            })
            conversation.on('typingStarted', (participant) => {
                console.log({
                    message: 'Registered typingStarted Listener on conversation',
                    participant
                })
            })
            conversation.on('typingEnded', (participant) => {
                console.log({
                    message: 'Registered typingEnded Listener on conversation',
                    participant
                })
            })
            conversation.on('participantJoined', (participant) => {
                console.log({
                    message: 'Registered participantJoined Listener on conversation',
                    participant
                })
            })
            conversation.on('participantLeft', (participant) => {
                console.log({
                    message: 'Registered participantLeft Listener on conversation',
                    participant
                })
            })

            conversation.typing();

            const messageBody = 'Hello, this is my message body';
            const messageAttributes = { 'source': 'customer' };
            conversation.sendMessage(messageBody, messageAttributes);

            const messages = await conversation.getMessages();
            console.log({
                messages: messages.items
            })
        } catch (e) {
            console.error(e);
        }
    });