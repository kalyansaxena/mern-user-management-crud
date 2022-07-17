const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started listening on port ${port}`));
