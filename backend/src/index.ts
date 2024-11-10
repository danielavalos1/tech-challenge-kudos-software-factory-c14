//Crear el servidor con express
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
var morgan = require("morgan");
import path from "path";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error";
import verifyToken from "./middlewares/authenticate";
import { authorize } from "./middlewares/authorize";
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.text({ type: "text/csv", limit: "50mb" }));

// Settings
app.set("port", process.env.PORT || 5500);

// Routes
import authRouter from "./routers/auth/router";
import uploadRouter from "./routers/upload/router";

app.use("/auth", authRouter);

app.use(
  "/upload",
  (req, res, next) => {
    verifyToken(req, res, next);
  },
  authorize("admin"),
  uploadRouter
);

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandler(err, _req, res, _next);
});

//app.use(errorHandler); por alguna razón no lo acepta así

// Static files

app.use(express.static(path.join(__dirname, "public")));

// Starting the server

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
