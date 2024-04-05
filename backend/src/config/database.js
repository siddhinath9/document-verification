//connect to mongoDB

const mongoose = require('mongoose');

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected successfully');
    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDatabase;