import mongoose from "mongoose";
import "dotenv/config";

import { DatabaseConnectionStatusMessage } from "../messages/database-messages.js";

const MongodbDatabaseURI = process.env.MONGO_URI || "";

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(MongodbDatabaseURI).then((data) => {
      console.log(DatabaseConnectionStatusMessage(data.connection.host));
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(ConnectDatabase, 5000);
  }
};

export default ConnectDatabase;
