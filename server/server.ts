require("dotenv").config();
import { app } from "./app";
import connectDB from "./utils/db";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  connectDB();
});
