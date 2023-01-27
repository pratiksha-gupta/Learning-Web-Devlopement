//eae8d78038cc1b3733aa922772e4757d-us21 - mailchimp api keys
// unique audience id : f0cbbd5467
//domain name - https://us21.admin.mailchimp.com/



const express = require("express");
const client = require("@mailchimp/mailchimp_marketing");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("./MAILCHIMP_API")


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let response;

client.setConfig({
    apiKey: mailchimp.MAILCHIMP_API_KEYS,
    server: mailchimp.SERVER
});

app.listen(process.env.PORT || 3000, function (){
    console.log("Server is running on port 3000");
});

app.post("/", function(req, res ){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    

    async function run() {
     try{
         response = await client.lists.addListMember( mailchimp.UNIQUE_AUDIENCE_ID, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        
        });

        if (response.status === 'subscribed'){
            console.log(
                `Successfully added contact as an audience member. The contact's id is ${response.id} ${response.status}.`
            );
            res.sendFile(__dirname+ "/success.html");
        }
     }
     catch(error){
            console.log("************** New request *****************")
            console.log(`API status code : ${error.status}`)
            console.log(`Error Title  : ${error.response.body.title}`)
            console.log(`Error details  : ${error.response.body.detail}`)
            res.sendFile(__dirname + "/failure.html");
      }
    }
    run();
});

app.get('/', function(req , res){
    res.sendFile(__dirname + "/signup.html");
});

