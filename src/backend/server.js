const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('./config/mongoose');
const AppRoutes = require('./routes')
const bodyparser = require('body-parser');
const session = require('express-session');


const app = express()
const port = process.env.PORT

// defining path for views
const distPath = path.join(__dirname,'../frontend/dist');
const viewsPath = path.join(__dirname, '../frontend/view');
const partialPath = path.join(__dirname, '../frontend/partial');


//setup handler engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
// app.use(express.json())
app.use(express.static(distPath));
app.use(bodyparser.urlencoded({extended: false}));


//setting up node to use session to authenticate user
app.use(session({
    secret: process.env.SESS_SECRET,
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
}))

//initializing app routing
AppRoutes.init(app);

// app.get ('*', (req, res) => {
//     res.render('404',{
//         title: '404'
//     })
// })

app.listen(port, () => {
    console.log('server on port: '+port)
});