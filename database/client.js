const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("📡 Database connection successful 📡");
  })
  .catch((e) => console.log(e.message));

const client = mongoose.connection;

client.on("error", (e) => console.log(e.message));

module.exports = client;

/* process.env.MONGO_DB 
"mongodb+srv://test:test123@cluster0.7uluyq7.mongodb.net/PokeFightRanking"
*/
