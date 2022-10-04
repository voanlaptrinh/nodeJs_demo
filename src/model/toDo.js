import mongoose from "mongoose";

const { Schema } = mongoose;

const toDo = new Schema({
    name: { 
        type: String, 
        length: 255
    },
    userLogin: { type:String },
    status: {type: Boolean},
    storage: {type: String },
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

export default mongoose.model('todos', toDo)