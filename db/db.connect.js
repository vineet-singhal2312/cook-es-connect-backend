const mongoose = require("mongoose");

async function initializeDbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://vineet:cook-es-connect@cluster0.fccbu.mongodb.net/cook-es-connect?authSource=admin&replicaSet=atlas-dsh7rv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    console.log("connecting......");
  } catch (error) {
    console.log({ error: error });
  }
}

module.exports = { initializeDbConnection };
