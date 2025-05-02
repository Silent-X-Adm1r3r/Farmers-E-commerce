const mongoose = require('mongoose');
console.log("MongoDB URI:", process.env.DB_LOCAL_URI);

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    })
}

module.exports = connectDatabase;