import http from "http";
import express from "express";
import { compute, validate } from "./compute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/compute", (request, response) => {
  const body = request.body.game;

  validate(body, (err, game)=>{
    err ? response.status(400).json(err) :
    response.json(compute(game));
  })

});

app.get("/alive", (req, res) =>{
  return res.json("I'm alive");
})

export const createServer = () => http.createServer(app);
