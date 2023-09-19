import { Router } from "express";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import {
  cloudinarySingleUpload,
  cloudinarySingleDelete,
} from "../utils/uploadImg.js";
import {
  createUser,
  createHobbyInterest,
  createUserHobbyInterests,
} from "../utils/userManagement.js";

const userProfileRouter = Router();

userProfileRouter.get("/check-available", async (req, res) => {
  const checkColumn = req.query.checkColumn;
  const checkValue = req.query.checkValue;
  const token = req.headers.authorization;
  const userInfo = jwt.decode(token.replace("Bearer ", ""));
  const userId = userInfo.id;
  try {
    const query = `
      SELECT COUNT(${checkColumn}) AS count
      FROM users
      WHERE ${checkColumn} = $1 AND user_id <> $2
    `;
    const respone = await pool.query(query, [checkValue, userId]);
    const count = parseInt(respone.rows[0].count);
    return res.json({
      data: !(count > 0),
    });
  } catch (error) {
    console.log("Check Avilable Error:");
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userProfileRouter.get("/:userId", async (req, res) => {
  const query = `
  SELECT
    u.user_id,
    u.username,
    u.email,
    u.name,
    u.sex,
    u.city,
    u.location,
    u.date_of_birth,
    u.sexual_preferences,
    u.racial_preferences,
    u.meeting_interests,
    u.about_me,
    (
      select image from profile_images pi
      WHERE pi.user_id = u.user_id
    ) as image,
    array_agg(hi.hobby_interest_name) AS hobby_interests
  FROM
    users u
  LEFT JOIN
    users_hobbies_interests uhi ON u.user_id = uhi.user_id
  LEFT JOIN
    hobbies_interests hi ON uhi.hobby_interest_id = hi.hobby_interest_id
  WHERE
    u.user_id = $1
  GROUP BY
    u.user_id, u.username, u.email, u.name, u.sex, u.city, u.location, u.date_of_birth, u.sexual_preferences, u.racial_preferences, u.sex_identities, u.meeting_interests, about_me
  `;

  try {
    const userId = req.params.userId;
    const respone = await pool.query(query, [userId]);
    return res.json({
      data: respone.rows[0],
    });
  } catch (error) {
    console.error(`Get user profile failed: ${error.message}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

userProfileRouter.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // get user picture profile
    const queryGetUserPicturesProfile = `
    select image from profile_images pi
    WHERE pi.user_id = $1
    `;
    const getUserPicturesProfile = await pool.query(
      queryGetUserPicturesProfile,
      [userId]
    );
    const userPicturesProfile = getUserPicturesProfile.rows[0].image;

    // get user hobbies/interests
    const queryGetUserHobbiesInterests = `
    SELECT
      array_agg(hi.hobby_interest_name) AS hobby_interests
    FROM
      users_hobbies_interests uhi
    LEFT JOIN
      hobbies_interests hi ON uhi.hobby_interest_id = hi.hobby_interest_id
    WHERE
      uhi.user_id = $1
    GROUP BY
      uhi.user_id
    `;
    const getUserHobbiesInterests = await pool.query(
      queryGetUserHobbiesInterests,
      [userId]
    );

    // delete user data in users table
    const queryDeleteUser = `
    DELETE FROM users WHERE user_id = $1
  `;
    const deleteUserResult = await pool.query(queryDeleteUser, [userId]);

    // delete user pictures profile on cloudinary
    for (const picture of userPicturesProfile) {
      await cloudinarySingleDelete(picture);
    }

    // delete hobbies/interests that have no any users used
    if (getUserHobbiesInterests.rows[0]) {
      const userHobbiesInterests =
        getUserHobbiesInterests.rows[0].hobby_interests;
      for (const tag of userHobbiesInterests) {
        const countHobbyExistsResponse = await pool.query(
          `
            SELECT COUNT(hobby_interest_id) AS count
            FROM users_hobbies_interests
            WHERE hobby_interest_id = (
                SELECT hobby_interest_id FROM hobbies_interests WHERE hobby_interest_name = $1
            );
            `,
          [tag]
        );
        const countHobbyExists = parseInt(
          countHobbyExistsResponse.rows[0].count
        );
        if (countHobbyExists === 0) {
          await pool.query(
            `
              DELETE FROM hobbies_interests WHERE hobby_interest_name = $1
              `,
            [tag]
          );
        }
      }
    }

    console.log(`Delete user profile succeed: ${userId}`);
    console.log("------------------------");
    return res.json({
      message: "Delete user profile succeed",
    });
  } catch (error) {
    console.error(`Delete user profile failed: ${error.message}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

const multerUpload = multer({ dest: "uploads/" });
const picturesProfileUpload = multerUpload.fields([
  { name: "newPicturesProfile_0", maxCount: 1 },
  { name: "newPicturesProfile_1", maxCount: 1 },
  { name: "newPicturesProfile_2", maxCount: 1 },
  { name: "newPicturesProfile_3", maxCount: 1 },
  { name: "newPicturesProfile_4", maxCount: 1 },
]);

userProfileRouter.put("/:userId", picturesProfileUpload, async (req, res) => {
  try {
    const userId = req.params.userId;

    const newUserData = {
      username: req.body.newUsername,
      email: req.body.newEmail,
      name: req.body.newName,
      city: req.body.newCity,
      location: req.body.newLocation,
      date_of_birth: req.body.newDateOfBirth,
      sexual_preferences: req.body.newSexualPreferences,
      racial_preferences: req.body.newRacialPreferences,
      sex: req.body.newSexualIdentites,
      meeting_interests: req.body.newMeetingInterests,
      about_me: req.body.newAboutMe,
      updated_at: new Date(),
    };

    //----------Update basic info and idetites of user-----------------
    let querySetValue = "";
    let queryParameter = [];
    let count = 1;
    for (let key in newUserData) {
      if (newUserData[key] !== undefined) {
        querySetValue += `${key}=$${count}, `;
        queryParameter.push(newUserData[key]);
        count++;
      }
    }
    querySetValue = querySetValue.slice(0, querySetValue.length - 2);
    const updateUser = await pool.query(
      `
      UPDATE users
      SET ${querySetValue}
      WHERE user_id = ${userId}
    `,
      queryParameter
    );
    console.log(`Update basic info and idetites of user_id:${userId} succeed`);
    //=-----delete hobby--------------
    if (req.body.deleteHobbiesInterests !== undefined) {
      const deleteHobbiesInterests = JSON.parse(
        req.body.deleteHobbiesInterests
      );
      for (let key of deleteHobbiesInterests) {
        const deleteUserHobby = await pool.query(
          `
          DELETE FROM users_hobbies_interests
          WHERE user_id = ${userId}
          AND hobby_interest_id = (
              SELECT hobby_interest_id FROM hobbies_interests WHERE hobby_interest_name = $1
          );
          `,
          [key]
        );
        const countHobbyExistsResponse = await pool.query(
          `
          SELECT COUNT(hobby_interest_id) AS count
          FROM users_hobbies_interests
          WHERE hobby_interest_id = (
              SELECT hobby_interest_id FROM hobbies_interests WHERE hobby_interest_name = $1
          );
          `,
          [key]
        );
        const countHobbyExists = parseInt(
          countHobbyExistsResponse.rows[0].count
        );
        if (countHobbyExists === 0) {
          await pool.query(
            `
            DELETE FROM hobbies_interests WHERE hobby_interest_name = $1
            `,
            [key]
          );
        }
        console.log(`Delete hobby/interest succeed: ${key}`);
      }
    }
    //-------add new hobby---------
    if (req.body.newHobbiesInterests !== undefined) {
      const newHobbiesInterests = JSON.parse(req.body.newHobbiesInterests);
      const hobbyInterestIds = [];
      for (let key of newHobbiesInterests) {
        const hobbyInterestId = await createHobbyInterest(key);
        hobbyInterestIds.push(hobbyInterestId);
      }
      await createUserHobbyInterests(userId, hobbyInterestIds);
      console.log(
        `Add new hobbies/interests: ${JSON.stringify(newHobbiesInterests)}`
      );
    }
    //----Update profile picture---------
    let picturesProfileFromClient = [];
    let newPicturesProfile = [];
    for (let i = 0; i < 5; i++) {
      let picture =
        req.body[`newPicturesProfile_${i}`] ||
        req.files[`newPicturesProfile_${i}`] ||
        null;
      picturesProfileFromClient.push(picture);
    }
    picturesProfileFromClient = picturesProfileFromClient.filter(
      (picture) => picture !== null
    );
    for (let i = 0; i < picturesProfileFromClient.length; i++) {
      if (typeof picturesProfileFromClient[i] === "string") {
        newPicturesProfile.push(JSON.parse(picturesProfileFromClient[i]));
      } else {
        const pictureProfileUrl = await cloudinarySingleUpload(
          picturesProfileFromClient[i][0]
        );
        newPicturesProfile.push(pictureProfileUrl);
      }
    }
    await pool.query(
      `
        update profile_images 
        set image=$1::json
        where user_id=$2
      `,
      [JSON.stringify(newPicturesProfile), userId]
    );

    console.log(`Update profile picture succeed`);
    //---------delete profile picture----
    if (req.body.deleteProfilePictures) {
      const deleteProfilePictures = JSON.parse(req.body.deleteProfilePictures);
      for (let picture of deleteProfilePictures) {
        const result = await cloudinarySingleDelete(picture);
      }
      console.log("Delete unused profile picture succeed");
    }

    console.log("------------------------------");
    return res.json({
      message: "Update user profile succeed",
    });
  } catch (error) {
    console.log("Edit User Profile Error :");
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

export default userProfileRouter;
