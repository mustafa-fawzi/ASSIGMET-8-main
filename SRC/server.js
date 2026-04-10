import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { appRoutes } from "./app.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());

connectDB();
appRoutes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
