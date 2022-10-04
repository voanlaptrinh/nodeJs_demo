import mongoose from "mongoose";

export default function connect() {
    mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('thành công.......!');
}
      



