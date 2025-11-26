require("dotenv").config();
const accountSid = 'ACaa2fe511cf8792d2a3ff6a4ff3e3030c';
const authToken = 'c466a7b30d2281238ac2d14a7a0566b2';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Your appointment is coming up on Maret 21 at 3PM',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+6281338702630'
    })
    .then(message => console.log(message.sid))