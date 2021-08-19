// Requiring mailchimp's module
// For this we need to install the npm module @mailchimp/mailchimp_marketing. 
//To do that we write: npm install mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and bodyy parser and initalizing the constant "app"
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying 
//the port 3000 is running
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port 3000!");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/signup.html");

});
// Setting up MailChimp
mailchimp.setConfig({
    // YOUR_API_KEY
    apiKey: "c79e412c2646b3f0fcf1cf3f72e383b5-us6",
    // YOUR_SERVER_PREFIX
    server: "us6",
});
//As soon as the sign in button is pressed execute this 
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    //Enter you list id here
    const listId = "6535624d14";
    // Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };
    // Uploading the data to the server
    const run = async () => {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            }
        });
        res.sendFile(__dirname + "/success.html")
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
       }
       //Running the function and catching the errors (if any)
       // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
       // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
        run().catch(e => res.sendFile(__dirname + "/failure.html"));
       });

app.post('/failure' , (req , res)=>{

    res.redirect("/");

})

  
// api key
// c79e412c2646b3f0fcf1cf3f72e383b5-us6

// Audience ID
// 6535624d14