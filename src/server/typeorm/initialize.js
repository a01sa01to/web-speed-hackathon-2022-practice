import fs from "fs/promises";

import sqlite3 from "sqlite3";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths.js";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);

  const db = new sqlite3.Database(DATABASE_PATH);
  const run = (query) => new Promise((resolve, reject) => {
    db.run(query, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  await run("CREATE INDEX idx_race_id ON odds_item (raceId);");
}
