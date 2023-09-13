import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const createUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const userInsertResult = await pool.query(
      `
        INSERT INTO users (username, password, email, name, sex, city, location, date_of_birth, sexual_preferences, racial_preferences, meeting_interests, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING user_id
        `,
      [
        userData.username,
        hashedPassword,
        userData.email,
        userData.name,
        userData.sex,
        userData.city,
        userData.location,
        userData.date_of_birth,
        userData.sexual_preferences,
        userData.racial_preferences,
        userData.meeting_interests,
        userData.created_at,
        userData.updated_at,
      ]
    );
    console.log("create user complete");
    return userInsertResult.rows[0].user_id;
  } catch (error) {
    throw error;
  }
};

const createHobbyInterest = async (hobbyInterestName) => {
  try {
    const existingHobbyInterest = await pool.query(
      `
        SELECT hobby_interest_id
        FROM hobbies_interests
        WHERE hobby_interest_name = $1
        `,
      [hobbyInterestName]
    );

    if (existingHobbyInterest.rows.length > 0) {
      return existingHobbyInterest.rows[0].hobby_interest_id;
    } else {
      const newHobbyInterest = await pool.query(
        `
          INSERT INTO hobbies_interests (hobby_interest_name)
          VALUES ($1)
          RETURNING hobby_interest_id
          `,
        [hobbyInterestName]
      );
      console.log("insert hobby interest complete");
      return newHobbyInterest.rows[0].hobby_interest_id;
    }
  } catch (error) {
    throw error;
  }
};

const createUserHobbyInterests = async (userId, hobbyInterestIds) => {
  try {
    for (const hobbyInterestId of hobbyInterestIds) {
      await pool.query(
        `
            INSERT INTO users_hobbies_interests (user_id, hobby_interest_id)
            VALUES ($1, $2)
          `,
        [userId, hobbyInterestId]
      );
    }
  } catch (error) {
    throw error;
  }
};

export { createUser, createHobbyInterest, createUserHobbyInterests };
