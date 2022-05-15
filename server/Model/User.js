import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
  });

  export default mongoose.model('User',User) 