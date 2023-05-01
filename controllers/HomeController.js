const order = require('../models/orderModel');
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
   const or = await order.findOne({order_no:track_id});
    console.log(or);
    
  }
   
}

module.exports =  homeController