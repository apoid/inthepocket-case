import { Frame, Game } from "./types";

/**
 * Validates the number of frames;
 * 
 * @param game The Game: multidimensional array of Integers
 */
function isFrameCountValid(game: Game): boolean {
  if(game.length == 10){
    return true;
  }
  return false;
}

/**
 * Check if a value is numeric.
 * 
 * @param n the parameter
 */
function isNumber(value: number) {
  return !isNaN(value);
}

/**
 * Check if a point is not bigger than 10 or smaller than 0.
 * 
 * @param frame An array of integers
 */
function isScoreValid(frame: number[]): boolean{
  let flag = true;
  frame.forEach(score => {
    if(!isNumber(score) || (score < 0 || score > 10)){
      console.log(score)
      flag = false;
    }
  });
  return flag;
}

/**
 * Checks if the sum of the score in a frame is less than 10.
 * 
 * @param game a Game
 */
function isScoringValid(game: Game): boolean{
  let flag = true;
  game.forEach(frame => {
    if(!isScoreValid(frame) || frame[0] + frame[1] > 10){
      flag = false;
    }
  });
  return flag;
}

function isBodyValid(body): boolean{
  if(isFrameCountValid(body) && isScoringValid(body)){
    return true;
  }
  return false;
}

/**
 * Validates the body of the HTTP request.
 * 
 * @param body The body from the HTTP request
 * @param callback The callback function
 */
export function validate(body, callback){
  
  if (isBodyValid(body)){
    callback(null, body);
  }
  else callback("Invalid request");  
}

/**
 * Verify if no strike has been done at the first shot of the frame.
 * 
 * @param frame The frame containing the 2 shots
 */
function isOpenFrame(frame: Frame): boolean {
  if(frame[0] >= 0 && frame[0] < 10){
    return true
  }
  return false;
}

/**
 * Calculates the score of the game. Returns the score
 * 
 * @param game Computes the score of the game
 */
export function compute(game: Game): number {
  return 0
  //throw new Error("Not yet implemented"); // TODO
}
