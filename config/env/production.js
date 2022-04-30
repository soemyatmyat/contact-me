let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const mailChimpKey=process.env.mailChimpKey
const mailChimpAudienceId=process.env.mailChimpAudienceId
const mailChimpPrefix=process.env.mailChimpPrefix
module.exports = {
   port: port,
   mailChimpKey: mailChimpKey,
   mailChimpAudienceId: mailChimpAudienceId,
   mailChimpPrefix: mailChimpPrefix
}

