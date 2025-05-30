import mongoose from "mongoose"
import { type } from "node:os";

const tripSchema= new mongoose.Schema({
    destination:{
        type: String,
        required:true
    },
    departureDate:{
        type: String,
        required:true
    },
    returnDate:{
        type: String,
        required:true
    }
}, {
    timestamps: true
}); 

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;