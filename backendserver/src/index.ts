import express from "express";
import cors from "cors";
import { createServer } from "https";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("ok");
});

app.post("/", (_, res) => {
  res.send("ok");
});

app.listen(8852, () => {
  console.log("Сервер запущен");
});

/*const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/chain.pem"),
};

const server = https.createServer(options, app);

server.listen(444, () => {
  console.log("Сервер запущен");
});*/
