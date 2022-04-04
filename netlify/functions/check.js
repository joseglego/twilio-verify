const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioService = process.env.TWILIO_VERIFY_SERVICE
const client = require('twilio')(accountSid, authToken)

const check = (to, code) =>
  client.verify.services(twilioService)
    .verificationChecks
    .create({ to, code })

exports.handler = async function(event, context) {
  const { to: baseTo, code } = event.queryStringParameters
  const to = channel === 'sms' ? `+${baseTo}` : baseTo
  const result = await check(to, code)

  console.log({ result })

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
