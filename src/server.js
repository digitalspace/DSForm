const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const db = require("./app/models");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to DSForms database.");
  })
  .catch(err => {
    console.log("Cannot connect to DSForms database", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors(corsOptions));
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

require("./app/routes/dsform.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});