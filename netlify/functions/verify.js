const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioService = process.env.TWILIO_VERIFY_SERVICE
const client = require('twilio')(accountSid, authToken)

const verify = (to, channel) =>
  client.verify.services(twilioService)
    .verifications
    .create({ to, channel })

exports.handler = async function(event, context) {
  const { to: baseTo, channel } = event.queryStringParameters
  const to = channel === 'sms' ? `+${baseTo}` : baseTo
  const result = await verify(to, channel)

  console.log({ result })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
