import { Frame, Game } from "./types";

/**
 * Check if a value is numeric.
 * 
 * @param n the parameter
 */
function isNumber(value: number) {
  return !isNaN(value);
}

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
 * Check if a score is smaller than 10 or bigger than 0.
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
 * Check if the scoring for a Frame is valid.
 * @param frame 
 */
function isFrameScoreValid(frame: number[]): boolean{
  if(frame.length == 2 && frame[0] + frame[1] > 10){
    return false;
  }
  else if (frame.length == 3 && frame[0] + frame[1] + frame[2] > 30){
    return false;
  }
  return true
}

/**
 * Checks if the Game scoring is valid.
 * 
 * @param game a Game
 */
function isScoringValid(game: Game): boolean{
  let flag = true;
  game.forEach(frame => {
    if(!isScoreValid(frame) || !isFrameScoreValid(frame)){
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
 * Verify if no strike or spare has been done.
 * 
 * @param frame The frame containing the 2 shots
 */
function isOpenFrame(frame: number[]): boolean {
  if(frame[0] + frame[1] != 10){
    return true
  }
  return false;
}

/**
 * Checks if the frame is a spare.
 * @param frame 
 */
function isSpare(frame: number[]): boolean {
  if(frame[0] < 10 && (frame[0] + frame[1] == 10)){
    return true
  }
  return false;
}

/**
 * Checks if the frame is a strike.
 * @param frame 
 */
function isStrike(frame: number[]): boolean {
  if(frame[0] == 10){
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
  let result = 0

  for(let i = 0; i< 10; i++){
    let frame = game[i];
    //TODO: beautify + validate last frame's 3 shots
    if(i == 9){
      result += frame[0] + frame[1] + frame[2];
    }
    else if(isOpenFrame(frame)){
      result += frame[0] + frame[1];

      console.log("game "+i+": open frame", result);
    }
    else if(isSpare(frame)){
      result += 10 + game[i+1][0];

      console.log("game "+i+": spare", result);
    }
    else if(isStrike(frame)){
      result += 10 + game[i+1][0] + game[i+1][1];

      console.log("game "+i+": strike", result);
    }
  }
  return result;
}
