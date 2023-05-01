const env  = require("dotenv");
env.config();

const passport = require('passport');
const express = require( "express");
const web = require("./routes/web.js");
const  admin = require("./routes/admin.js");

const  path =  require ("path");
const CONNECT_DB = require ("./db/connection.js");
const  flash = require ("connect-flash");
const  session = require("express-session");
const cookieParser =   require("cookie-parser");
const cors = require("cors");
const  MongoStore =  require( "connect-mongo") ;
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

  const mongoaDBStore = new MongoStore({
    mongoUrl:DB_URL,
    dbName: process.env.DB_NAME
  })
app.use(
  session({
    name: "waqas",
    secret: "awais don",
    store:mongoaDBStore,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false,
    saveUninitialized: false,
  })
);


const LocalPassport  =  require("./config/authConfig.js");
LocalPassport(passport);


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  
  next();
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});



app.use(express.urlencoded({extended:false}));
app.use("/", web);


app.use("/admin", admin);


app.set("view engine", "ejs");

CONNECT_DB(DB_URL);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



  


