const order = require('../models/orderModel');
const track = require("../models/track.js");
class homeController {
  static index = (req,res) => {
      res.render('frontend/pages/home');
  }
  static about = (req,res) => {
      res.render('frontend/pages/about');
  }
  static services = (req,res) => {
      res.render('frontend/pages/services');
  }
  static contact = (req,res) => {
      res.render('frontend/pages/contact');
  }
   static login = (req,res) => {
      res.render('frontend/pages/login.ejs')
  }
   static track = async (req,res) => {

  
    const track_id = req.body.track_id;
    
   const order_data = await order.findOne({order_no:track_id});  

 
         if(order_data){      
          const order_id =  order_data._id;
          const track_data = await track.findOne({order_id:order_id}).populate('order_id');
        
           if(track_data){
                  console.log(track_data);
            res.render("tracking" , {data:track_data});
              

            }else{
                req.flash("error","Tracking Not Available");
                res.redirect("/");
            }

           }else{
              
            req.flash("error","Order tracking Not exist Please enter a valid tracking ID");
            res.redirect("/");
           }

    
    
  }
   
}

module.exports =  homeController