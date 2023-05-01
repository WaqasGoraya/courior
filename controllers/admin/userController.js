const userModel = require("../../models/userModel.js");
class user {

    static index = async (req,res)=>{
        try {
            
            const user = await userModel.find();
           res.render("backend/pages/users",{user})
        } catch (error) {
            
            console.log(error);
        }
    }

}

module.exports = user;