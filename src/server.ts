import http from "http";
import express from "express";
import { compute } from "./compute";
import{validate} from "./validate";
import { v4 } from 'uuid';
import {addScore, getScore} from './db/service'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * POST request to compute the score of a 10 pin bowling game.
 * It expects a JSON object with as body with this structure:
 * {
 *    "game": <number[][]>
 * } 
 * Example: 
 * {"game": [[1,2],[3,4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0,0]]}
 * 
 * 
 * Returns a JSON object:
 * {
 *    "score":  <number>,
 *    "id":     <unique-id>
 * }
 */
app.post("/compute", (request, response) => {
  console.log("Incoming HTTP request: ", request.url)

  try{
    const body = request.body.game;

    validate(body, (err, game)=>{
      if(err){
        response.status(400).json({error: err});
      }
      let score = compute(game);
      let uid = v4();

      addScore(score, uid)
      .then(res => response.json(res))
      .catch(err => response.status(500).json({error: err}))
    })

  }catch(e){
    response.status(400).json({"Error": e.message});
  }
});

/**
 * GET request to retrieve a score from the database.
 * The request contains a query parameter named "game" that is the unique id of a previously computed game.
 * 
 * Return a JSON object:
 * {
 *    "score":  <number>,
 *    "id":     <unique-id>
 * }
 */
app.get("/history", (request, response) =>{
  try{
    let uuid = request.query.game;
    if (uuid == null){
      throw new Error("Parameter is invalid")
    };
    getScore(uuid)
    .then(score => {
      response.json(score);
    })
    .catch(err => response.status(500).json({error: err}));
  }catch(e){
    response.status(400).json({"Error": e.message});
  }
})

/**
 * Simple GET route to check the status of the HTTP server.
 */
app.get("/alive", (req, res) =>{
  return res.json("I'm alive");
})

export const createServer = () => http.createServer(app);
