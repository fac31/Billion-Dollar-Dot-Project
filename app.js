import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Serves static files from node_modules
//const staticModules = express.static(path.join(__dirname, "node_modules"));

//  Serves Static Files from public
app.use(express.static(path.join(__dirname, "public")));

//  Middleware
//app.use("/node_modules", staticModules);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("<h1>Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
// Select the container div and append the SVG
