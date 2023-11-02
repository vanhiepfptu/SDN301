const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./configs/dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");
const { swaggerDocs } = require("./configs/swagger");
const Socket = require("./routes/Socket");

// config environment variables
dotenv.config();

// handle data types json and handle data in postman
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//connect to frontend
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(cookieParser());

//connect to mongoose db
connectDB();
// define routes in app

// config swagger
routes(app);
app.get("/", (req, res) => {
  return res.send("Chin chao moi nguoi !");
});
app.get("/404", (req, res) => {
  return res.send("404 not found!");
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  swaggerDocs(app, process.env.PORT);
  console.log("Server is running on " + port);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  Socket.connect(socket, io);
});
