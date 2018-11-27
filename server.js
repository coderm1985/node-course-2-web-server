const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var log =`Request method: ${req.method}   Request Url:${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to create file server.log');
            
        }
    })
    next();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:"Home Page here",
        likings:[
            "Music",
            "Programming"
        ],
        welcomeMessage:"Welcome to Home",
        currentYear: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Us',
        fullYear: new Date().getFullYear()
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
});