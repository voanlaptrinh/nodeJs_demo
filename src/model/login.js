import mongoose from "mongoose";

const { Schema } = mongoose;

const login = new Schema({
    username: { 
        type: String, 
        length: 255,
        required: true,

    },
    pass: {type: String, required: true},
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    isAdmin: {type: Boolean},
    isActive: {type: Boolean}
})


export default mongoose.model('login', login)