const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/SDN301', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("successfully connected to the server");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB 