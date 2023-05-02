const mongoose = require("mongoose");



const orderSchema = mongoose.Schema({

  

      date :{type:String,required:true,trime:true},
     b_name :{type:String,required:true,trime:true},
     p_name :{type:String,required:true,trime:true},
     p_address :{type:String,required:true,trime:true},
     p_city :{type:String,required:true,trime:true},
     p_email :{type:String,required:true,trime:true},
     p_number :{type:Number,required:true,trime:true},  
     d_name :{type:String,required:true,trime:true},
     d_address :{type:String,required:true,trime:true},
     d_city :{type:String,required:true,trime:true},
     d_email :{type:String,required:true,trime:true},
     d_number :{type:Number,required:true,trime:true},  
     item_detail : {type:Object, trim:true},
     qty : {type:Object,  trim:true},
     price : {type:Object, trim:true},
     piece : {type:Number, required:true, trim:true},
     weigth : {type:Number, required:true, trim:true},
     length : {type:Number, required:true, trim:true},
     heigth : {type:Number, required:true, trim:true},
     status : {type:Boolean, required:true, trim:true},
     service_type:{type:String, required:true, trim:true},
     order_no : {type:String, required:true, trim:true},
     remarks:{type:String, required:true, trim:true},
     created_at:{type:Date , default:Date.now()}  
    
})


const orderModel = mongoose.model('order',orderSchema);

module.exports = orderModel;