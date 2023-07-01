const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

app.post('/', function(req,res){  //the first param refers to the path at which the server should listen for the post request

   const firstName = req.body.floatingFirstName;
   const lastName = req.body.floatingLastName;
   const email = req.body.floatingInput;

    const data = {
        members:[{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/111b3eb615"
    const options = {
        method: "POST",
        auth: "chandana9:292761b89e4f1f32edf2688ff525f8c5-us14"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post('/failure', function(req, res){
    res.redirect('/');
})

app.listen(8080,function(){
    console.log("The server has started on the port: 8080");
})

//Api key
// 292761b89e4f1f32edf2688ff525f8c5-us14

//List id
//111b3eb615