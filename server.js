const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
// This is to set the template engine
app.set('view engine', 'hbs');

// This is to set the public folder  -> MiddleWare
// app.use(express.static(__dirname +'/public'));

app.use((req,res,next) =>{
   res.render('maintenance.hbs');
})

app.use((req,res,next) =>{
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log',log +'\n', (err) =>{
     if(err){
       console.log('Unable to append the log.');
     }
   });
   next();
});

app.use(express.static(__dirname +'/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

//listener handler
app.get('/',(req, res)=>{serve
  // res.send('<h1>Hello Express!!</h1>');
  // res.send({
  //   name:'Vasanth',
  //   likes:[
  //     'Computing',
  //     'Drawing'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Vasanth'
  });
});

//Another route
app.get('/about', (req,res)=>{
  // res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About page'
  });
});

// app.get('/home', (req,res) =>{
//    res.render('home.hbs', {
//      pageTitle: 'About page',
//      welcomeMessage: 'Vasanth',
//      currentYear: new Date().getFullYear()
//    });
// });

app.get('/bad',(req,res)=>{
   res.send({
     errorMessage:'Bad request!!'
   });
});

app.listen(port, () =>{
   console.log(`Server us up on port ${port}`);
});
