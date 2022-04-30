process.env.NODE_ENV = process.env.NODE_ENV || "development"
const config=require("./config/config") //load the configuration from config > config.js > env > x.js
const express=require("express") //express is for building the REST APIs
//const cors=require("cors") //cors provides Express middleware to enable CORS with various options
const app=express()
app.use(express.json())//pares requests of content-type application/json
app.use(express.urlencoded({extended:true}))//parse requests of content-type application/x-www-form-urlencoded
app.use(express.static("public"))//load my assets


/* ===============================================
 MailChimp API (supposed to be on a separate page)
=============================================== */
const mc= require("@mailchimp/mailchimp_marketing")
mc.setConfig({
  apiKey: config.mailChimpKey,
  server: config.mailChimpPrefix
})

async function addMemberToMailChimp(data) {
  let mcResponse=await mc.lists.setListMember(
    config.mailChimpAudienceId,data[0].email_address,{
      email_address: data[0].email_address,
      status: data[0].status,
      merge_fields: data[0].merge_fields
    }
  )/*.then((response)=> {
    console.log(response)
  })*/
  .catch((error)=>{
    //console.error(error)
    return error
  })
  return mcResponse
}


/* ===================
 Routing 
 ====================*/
app.get("/",(req, res)=>{
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",async(req,res)=>{
  const firstName=req.body.fName
  const lastName=req.body.lName
  const email=req.body.email
  const msg=req.body.message
  const data=[
    {
      email_address:email,
      status:"subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        MSG: msg
      }
    }
  ]
  let mcResponse=await addMemberToMailChimp(data)
  if (mcResponse.contact_id != undefined) {
    //return success page
    res.sendFile(__dirname+"/success.html")
  } else { 
    //return error page
    res.sendFile(__dirname+"/error.html")
  }
})

app.post("/failure",(req,res)=>{
  res.sendFile(__dirname+"/signup.html")
})


app.listen(config.port,()=>{
  console.log("Server running at http://localhost: 8080")
})













