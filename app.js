//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
//const mainRoutes = require('./routes/mainRoutes');
//const mongoose = require('mongoose');
//const session = require('express-session');
//const MongoStore = require('connect-mongo');

//create app
const app = express();

//configure app
let port = process.env.PORT || 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

/**
//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/NBAD', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log("Server is running on port", port);
        });
    })
    .catch(err => console.log(err.message));

//mount middlware
app.use(
    session({
        secret: "vtDf228vv9749wDPKvtg",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60 * 60 * 1000}
        })
);
*/

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

//app.use('/connections', connectionRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});