const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const route = require("./routers");
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
// Database
const URL = process.env.MONGODB_URL;
mongoose.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false },
  (err) => {
    if (err) throw err;
    console.log("Connect successfully!");
  }
);

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:8000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

//Routes
route(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`);
});
