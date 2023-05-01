

const LocalStategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

   const init = (passport) =>{
             
    passport.use(new LocalStategy({usernameField:'email'},async (email,password,done)=>{


        const user = await User.findOne({email:email});
               
                     console.log(user);
          if(!user){

            return done(null, false , {message:'Email Does Not Exist'});
          }

           

            if(await bcrypt.compare(password, user.password)){

              return done(null, user , {message:'login User'});

            }else{

               
                return done(null,false,{message:'invalid Username or password'});

            }


    }))


    
    passport.serializeUser((user, done) => {
        done(null, user._id);
        
    });
    
    passport.deserializeUser((id, done) => {
       User.findById(id,(err, user)=> {
        done(err, user);
      });

    });


   }

   module.exports = init
