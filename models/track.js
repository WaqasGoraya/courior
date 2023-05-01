const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({

    order_id : {type: mongoose.Schema.Types.ObjectId, ref: 'order' },
    consignment_booked:{
    type: Object,
     default:false
},
    arrived_at_origin:{
    type: Object, 
    default:false
},
    moved_to_destination:{
        type: Object, 
        default:false
},
    reached_at_destination:{
        type: Object, 
        default:false
},
    out_for_delivery:{
        type: Object, 
        default:false
},
    delivered:{
        type: Object, 
        default:false
},
});

const trackModel = mongoose.model('Track',trackSchema);

module.exports = trackModel
