// require("dotenv").config();

// const mongoose = require("mongoose");
// const User = require("./models/user");

// async function reset() {
//   await mongoose.connect(process.env.ATLASDB_URL);

//   const user = await User.findOne({ username: "Gravity" });

//   await user.setPassword("newpass123");
//   await user.save();

//   console.log("Password reset successful");

//   mongoose.connection.close();
// }

// reset();