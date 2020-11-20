import http from "http";
import express from "express";
import { compute } from "./compute";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  // TODO: Validate input

  const score = compute(game);

  // TODO: Return response
});

app.get("/alive", (req, res) =>{
  return res.json("I'm alive");
})

export const createServer = () => http.createServer(app);
