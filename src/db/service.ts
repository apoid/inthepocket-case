import { sqlite3 } from "sqlite3";

const sqlite3 = require('sqlite3');

const DB_FILE = "./src/db/history.db"; 

/**
 * Opens the connection to a database file by its path.
 * @param databaseFile the path to the database.
 */
function openConnection(databaseFile){
    let db = new sqlite3.Database(databaseFile, sqlite3.OPEN_READWRITE, (err)=>{
        if(err){
            console.error(err.message); 
            return null;
        }
        console.log('Connection with the database established.');
    });
    return db;
}

/**
 * Adds a score with it's unique identifier in the database.
 * @param score the numeric score
 * @param uuid the unique identifier
 */
export function addScore(score: number, uuid){
    let db = openConnection(DB_FILE);
    let query = `INSERT INTO scores(score, uuid) VALUES(?, ?)`;
    return new Promise((resolve, reject) =>{
        db.run(query, [score,uuid], (err) =>{
            err ? reject(err) : resolve({score: score, id: uuid});
        });
    })
    .finally(() => closeConnection(db));
}

/**
 * Get a score from the database by its uuid
 * @param uuid the unique identifier.
 */
export function getScore(uuid){
    let db = openConnection(DB_FILE);
    let query = `SELECT * FROM scores WHERE uuid = ?`;
    return new Promise((resolve, reject) =>{
        db.get(query, [uuid], (err, row) =>{
            err ? reject(err) : resolve({score: row.score, id: row.uuid});
        });
    })
    .finally(() => closeConnection(db));
}

/**
 * Closes the connection to the database.
 * @param database the database.
 */
function closeConnection(database){
    database.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Closed database connection.');
      });
}