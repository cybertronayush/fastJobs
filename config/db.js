require('dotenv').config();
const mongoose = require('mongoose');
const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
};
function connectDB() {
      mongoose.connect(process.env.MONGO_CONNECTION_URL, connectionParams)
            .then(() => {
                  console.log("Connected to DB")
            })
            .catch((e) => {
                  console.log("ERROR", e);
            });
}
module.exports = connectDB;