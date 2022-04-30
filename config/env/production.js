let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const mailChimpKey="bf503794b9738f408a93d08dd0116b46-us17"
const mailChimpAudienceId="b0f7def584"
const mailChimpPrefix="us17"
module.exports = {
   port: port,
   mailChimpKey: mailChimpKey,
   mailChimpAudienceId: mailChimpAudienceId,
   mailChimpPrefix: mailChimpPrefix
}

