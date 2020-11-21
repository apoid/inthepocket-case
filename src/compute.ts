import { Frame, Game, LastFrame } from "./types";
import {isSpare, isStrike, isOpenFrame} from "./validate";

/**
 * Calculates the score of the game. Returns the score. 
 * @param game Computes the score of the game
 */
export function compute(game: Game): number {
  let result = 0

  for(let i = 0; i< 10; i++){
    let frame = game[i];
    result += computeFrameScore(i, frame, game);
    console.log("Frame "+(i + 1)+": ", result); //debug
  }
  return result;
}

/**
 * Computes the score for a Frame.
 * @param i the index of the frame in a game
 * @param frame the frame
 * @param game the game
 */
function computeFrameScore(i: number, frame: Frame | LastFrame, game: Game): number {
  if (i == 9) {
    return computeLastFrame(frame);
  }
  else if (isOpenFrame(frame)) {
    return frame[0] + frame[1];
  }
  else if (isSpare(frame)) {
    return 10 + game[i + 1][0];
  }
  else if (isStrike(frame)) {
    return computeStrike(game, i);
  }
}

/**
 * Compute the score for the last frame of a game.
 * @param frame the frame.
 */
function computeLastFrame(frame: number[]): number{
  return frame[0] + frame[1] + frame[2];
}

/**
 * Compute the score for a strike in a frame.
 * If there are 2 consecutive strikes we don't count the second bowl throw of a frame because it will be 0, so we count the score of the next two frames.
 * If we are on the second last frame, we will count the score of the consecutive two bowl throws of the last frame.
 * @param game the game
 * @param i the frame of a game
 */
function computeStrike(game: Game, i: number): number{
  if(isStrike(game[i+1]) && i != 8){
    return 10 + game[i+1][0] + game[i+2][0]
  }
  else{
    return 10 + game[i+1][0] + game[i+1][1];
  } 
}
