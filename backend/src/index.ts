//Crear el servidor con express
import express from "express";
import cors from "cors";
var morgan = require("morgan");
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Settings
app.set("port", process.env.PORT || 5500);

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});


// Static files

app.use(express.static(path.join(__dirname, "public")));

// Starting the server

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
