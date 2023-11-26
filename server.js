
var express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
var app = express();
const bodyParser = require('body-parser');
const fetch = import("node-fetch");
const { auth,requiresAuth } = require('express-openid-connect');
//adriel.henrique@fcc.sp.gov

const Art  = new mongoose.Schema({
    nome: String,
    descricao: String,
    longi: String,
    lati: String,
    cidade: String,
    distrito: String,
    pais: String
});

const art = new mongoose.model('Art',Art);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'sKYoCDqpTfzA9j0a-ic-fO18q1h6D7pMklkAyOq7l543Ba6N6PZmd3MMDnne4X7B',
  baseURL: 'http://localhost:3000',
  clientID: 'GOXNs8O2VwsgIMO2ZBmOaERDXxHDhd0U',
  issuerBaseURL: 'https://dev-gzfiuaua5sfibk4h.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
/*
    baseURL - The URL where the application is served
    secret - A long, random string
    issuerBaseURL - The Domain as a secure URL found in your Application settings
    clientID - The Client ID found in your Application settings

*/

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mySecret = process.env['MONGO_URI'];

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mySecret);
}

const PORT = 3000;

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/view/index.html');
});



app.get('/playground', requiresAuth(),(req, res)=>{
    res.sendFile(__dirname + '/view/logged.html');
});

app.post('/api/obra', async(req,res)=>{
    const obj = req.body;
    try{
     var response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${obj.logi}&lon=${obj.lati}&format=json&apiKey=a15b8fb0bbdd4b6bb07b057a08e0fc3a`);
     const data = await response.json();
     console.log(data.results[0].city);
     let pic = new art({
       name:obj.name,
       descricao:obj.descricao,
       longi:obj.logi,
       lati: obj.loti,
       cidade: data.results[0].city,
       distrito: "aa",
        pais:"bb"
      });
     await pic.save();
    }catch(err){
     console.log(err);
    }
    res.json({"res":200});
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
