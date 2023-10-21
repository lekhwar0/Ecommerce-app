// import mongoose from "mongoose";

// import { MONGODB_URL } from "../config/appConfig.js";

// mongoose
//   .connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`Connected to MongoDB`);
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB", err);
//   });

// export default mongoose.connection;

import mongoose from "mongoose";

import { MONGODB_URL } from "../config/appConfig.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conneted To Mongodb Databse ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in Mongodb");
  }
};
export default connectDB;
