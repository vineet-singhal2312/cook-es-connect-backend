const mongoose = require("mongoose");

async function initializeDbConnection() {
  try {
    await mongoose.connect(
      process.env.REACT_APP_CONNECTION_STRING,

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
