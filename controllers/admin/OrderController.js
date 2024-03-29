const orderModel = require("../../models/orderModel.js");
const OrderModel = require("../../models/orderModel.js");
const track = require("../../models/track.js");
const qrcode = require('qrcode');
var moment = require('moment-timezone');


// const puppeteer = require("puppeteer");

class OrderController {
  
  static index = async (req,res)=>{

    try {
   
     const order = await track.find({}).sort({_id : 'desc'}).populate("order_id");         

     
        res.render("backend/pages/orders/order",{order});
        
    } catch (error) {
        console.log(error)
    }
  }
  static show = async (req,res)=>{

    try {

        res.render("backend/pages/orders/addOrder")
        
    } catch (error) {
        console.log(error)
    }
  }



  static store = async (req,res)=>{
    
   const order_no = await Math.floor(Math.random() * 1000000000)

   console.log(req.body)
    try {

  
               req.session.order_id = order_no;

              const {b_name , date , p_name ,p_email , p_phone , p_city , p_address ,  d_name , d_email , d_phone , d_city , d_address , service_type , items_details , qty , price , piece , weigth ,order, length , heigth,remarks} = req.body;

           const orderDoc = new OrderModel({

            b_name : b_name ,
            date : date ,
            p_name : p_name ,
            p_email : p_email ,
            p_number : p_phone ,
            p_city : p_city ,
            p_address : p_address ,
            d_name : d_name ,
            d_email : d_email ,
            d_number : d_phone ,
            d_city : d_city ,
            d_address : d_address ,
            service_type : service_type,
            items_details : items_details ,
            qty : qty ,
            price : price ,
            piece : piece ,
            weigth : weigth ,
            length : length ,
            heigth : heigth ,
            status : 0 ,
            order_no :order_no,
            remarks:remarks,
            order:order,
              
           })

      const order_data =   await orderDoc.save();

     const id = order_data._id;
             //  tracking value set 

        let t_date =  moment().tz("Asia/Karachi").format('lll');

              
   

         var newobject ={
           status:1,
           date:t_date,
         }

         const status = new track({
    
           order_id:id,
           consignment_booked:newobject,
           status: "consignment Booked",
           status_date : t_date
         })
 
         await status.save();

        
        //  tracking value set 


         res.redirect("/admin/invoice");
          
      
         
        
    } catch (error) {
        console.log(error)
    }
  }


  static invoice = async (req,res)=>{


    try {

      const order_id =  req.session.order_id
      

    

     const order = await  OrderModel.findOne({ order_no:order_id });
     console.log(order);
     const qr_code = await order.order_no;
     qrcode.toDataURL(qr_code, async (err, url) => {
      if (err) throw err;
       await  res.render('qrcode', { qrCode: url , data : order }); 
    });
     
   
        
    } catch (error) {
        
        console.log(error);
    }

  }

    static genrate_pdf = async (req , res)=>{

        try {

            const browser = await puppeteer.launclaunch();

            const page = await browser.newPage();

            await page.goto(`${req.protocol}://${req.get('host')}/admin/add_order`)

            
        } catch (error) {
            
            console.log(error);
        }
    }



    static  order_detail = async (req,res)=>{

      try {
          
        const order_id = await req.params.id;
                
        const track_status = await track.findOne({order_id:order_id}); 
       
      
        const order = await orderModel.findOne({_id:order_id});
               
        const qr_code = await order.order_no;
        // console.log(order)
              qrcode.toDataURL(qr_code, (err, url) => {
                  if (err) throw err;
                    res.render('qrcode_detail', { qrCode: url , data : order ,track: track_status}); 
                });
         

        
      } catch (error) {
        console.log(error);
      }
    }




    static order_change = async (req,res)=>{
      try {

        const id = req.params.id;
        const  detail  = req.params.detail;
         	 
        console.log(detail);

        
                 let date =    moment().tz("Asia/Karachi").format('lll');
              
               if(detail == "Consignment_Booked"){

                var newobject ={
                  status:1,
                  date:date,
                }

                const status = new track({
           
                  order_id:id,
                  consignment_booked:newobject,
                  status: "consignment Booked",
                  status_date : date
                })
        
                await status.save();
    
               }

              
                if(detail == "arrived_at_origin"){
                         
                   const track_data = await track.findOne({order_id:id});
                   
                   const new_id = track_data._id;
                   
                         
                      var newobject ={
                        status:1,
                        date:date,
                      }
                      const filter = { _id: new_id };
                      const update = { arrived_at_origin: newobject , status:"Arrived At Origin" ,  status_date : date};

                      // `doc` is the document _after_ `update` was applied because of
                      // `new: true`
                      const doc = await track.findOneAndUpdate(filter, update, {
                        new: true
                      });
                    
                   
                   
                  
                }
                if(detail == "moved_to_destination"){
                         
                   const track_data = await track.findOne({order_id:id});
                   
                   const new_id = track_data._id;
                   
                         
                      var newobject ={
                        status:1,
                        date:date,
                      }
                      const filter = { _id: new_id };
                      const update = { moved_to_destination: newobject , status:"Moved To Destination", status_date : date};

                      // `doc` is the document _after_ `update` was applied because of
                      // `new: true`
                      const doc = await track.findOneAndUpdate(filter, update, {
                        new: true
                      });
                    
                   
                   
                  
                }
                if(detail == "reached_at_destination"){
                         
                   const track_data = await track.findOne({order_id:id});
                   
                   const new_id = track_data._id;
                   
                         
                      var newobject ={
                        status:1,
                        date:date,
                      }
                      const filter = { _id: new_id };
                      const update = { reached_at_destination: newobject  , status:"Reached At Destination", status_date : date};

                      // `doc` is the document _after_ `update` was applied because of
                      // `new: true`
                      const doc = await track.findOneAndUpdate(filter, update, {
                        new: true
                      });
                    
                   
                   
                  
                }
                if(detail == "out_for_delivery"){
                         
                   const track_data = await track.findOne({order_id:id});
                   
                   const new_id = track_data._id;
                   
                         
                      var newobject ={
                        status:1,
                        date:date,
                      }
                      const filter = { _id: new_id };
                      const update = { out_for_delivery: newobject , status:"Out For Delivery", status_date : date};

                      // `doc` is the document _after_ `update` was applied because of
                      // `new: true`
                      const doc = await track.findOneAndUpdate(filter, update, {
                        new: true
                      });
                    
                   
                   
                  
                }

                if(detail == "delivered"){
                         
                
                   const track_data = await track.findOne({order_id:id});
                   
                   const new_id = track_data._id;
                   
                         
                      var newobject ={
                        status:1,
                        date:date,
                      }
                      const filter = { _id: new_id };
                      const update = { delivered: newobject , status:"Delivered", status_date : date};

                      // `doc` is the document _after_ `update` was applied because of
                      // `new: true`
                      const doc = await track.findOneAndUpdate(filter, update, {
                        new: true
                      });
                    
                      console.log(doc);
                   
                   
                  
                }
                res.redirect('/admin/orders');

          

       
        

        
      } catch (error) {
        
        console.log(error);
      }
    }



}


module.exports = OrderController;