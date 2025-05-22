import mongoose from "mongoose"
import { type } from "node:os";

const tripSchema= new mongoose.Schema({
    destination:{
        type: "String",
        required:true
    },
    departure:{
        type: "String",
        required:true
    },
    return:{
        type:"String",
        required:true
    }
}, {
    timestamps: true
}); 

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;