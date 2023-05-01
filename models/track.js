const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
    consignment_booked:{
    type: String, trim:true,
    timestamp: true
},
    arrived_at_origin:{
    type: String, trim:true,
    timestamp: true
},
    moved_to_destination:{
    type: String, trim:true,
    timestamp: true
},
    reached_at_destination:{
    type: String, trim:true,
    timestamp: true
},
    out_for_delivery:{
    type: String, trim:true,
    timestamp: true
},
    delivered:{
    type: String, trim:true,
    timestamp: true
},
});

const trackModel = mongoose.model('Track',trackSchema);

module.exports = trackModel
