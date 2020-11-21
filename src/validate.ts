import { Frame, Game, LastFrame } from "./types";

/**
 * Verify if no strike or spare has been done.
 * @param frame The frame containing the 2 shots
 */
export function isOpenFrame(frame: number[]): boolean {
    if (frame[0] + frame[1] != 10) {
        return true
    }
    return false;
}

/**
 * Checks if the frame is a spare.
 * @param frame 
 */
export function isSpare(frame: number[]): boolean {
    if (frame[0] < 10 && (frame[0] + frame[1] == 10)) {
        return true
    }
    return false;
}

/**
 * Checks if the frame is a strike.
 * @param frame 
 */
export function isStrike(frame: number[]): boolean {
    if (frame[0] == 10) {
        return true
    }
    return false;
}

/**
 * Validates the body of the HTTP request.
 * 
 * @param body The body from the HTTP request
 * @param callback The callback function
 */
export function validate(body, callback) {

    if (isBodyValid(body)) {
        callback(null, body);
    }
    else callback("Invalid request");
}

/**
 * Check if a value is numeric.
 * @param n the parameter
 */
function isNumber(value: number) {
    return !isNaN(value);
}

/**
 * Validates the number of frames.
 * @param game a game.
 */
function isFrameCountValid(game: Game): boolean {
    if (game.length == 10) {
        return true;
    }
    return false;
}

/**
 * Check if a score is smaller than 10 or bigger than 0.
 * @param frame An array of integers
 */
function isScoreValid(frame: number[]): boolean {
    let flag = true;
    frame.forEach(score => {
        if (!isNumber(score) || (score < 0 || score > 10)) {
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
function isFrameScoreValid(frame: number[]): boolean {
    if (frame.length == 2 && frame[0] + frame[1] > 10) {
        return false;
    }
    else if (frame.length == 3 && frame[0] + frame[1] + frame[2] > 30) {
        return false;
    }
    return true
}

/**
 * Validates the values for the last frame in a game.
 * @param frame the last frame
 */
function isLastFrameScoreValid(frame: LastFrame): boolean {
    let twoShotFrame = [frame[0], frame[1]];
    if (!isStrike(twoShotFrame) && !isSpare(twoShotFrame)) {
        if (frame[2] != 0) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the Game scoring is valid.
 * @param game a Game
 */
function isScoringValid(game: Game): boolean {
    if (!isLastFrameScoreValid(game[9])) {
        return false;
    }
    let flag = true;
    game.forEach(frame => {
        if (!isScoreValid(frame) || !isFrameScoreValid(frame)) {
            flag = false; 8
        }
    });
    return flag;
}
/**
 * Validates a body coming from an HTTP request.
 * @param body the body of a request
 */
function isBodyValid(body): boolean {
    if (isFrameCountValid(body) && isScoringValid(body)) {
        return true;
    }
    return false;
}