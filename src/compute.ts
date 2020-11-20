import { Frame, Game } from "./types";

/**
 * Validate if the number of frames is valid;
 * 
 * @param body A multidimensional array of Integers
 */
function isFrameCountCorrect(body: Game): boolean {
  if(body.length == 10){
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
export function validate(body, callback): Game {

  let game;
  console.log("Body: ", body.length);

  return callback(null,game);
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
