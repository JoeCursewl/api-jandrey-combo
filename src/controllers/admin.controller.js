import pool from "../db.brd.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  error_messgae_500,
  error_messgae_401,
  error_messgae_400,
  hashingPassword,
  date,
} from "../config.brd.js";
import { configDotenv } from "dotenv";
configDotenv();

const { SECRET_KEY } = process.env;

export const registerPosts = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    const uuid = crypto.randomUUID();
    const {
      title_post,
      description_post,
      updated_at,
      created_at,
      labels,
      _id_user,
      name,
    } = req.body;

    const iQuery =
      "INSERT INTO post_admins VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const response = await pool.query(iQuery, [
      uuid,
      title_post,
      description_post,
      updated_at,
      created_at,
      labels,
      _id_user,
      name,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    console.log(SECRET_KEY);
    return res.status(200).json({
      uuid: uuid,
      title_post: title_post,
      description_post: description_post,
      updated_at: updated_at,
      created_at: created_at,
      labels: labels,
      _id_user: _id_user,
      name: name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const getPosts = async (req, res) => {
  const api_key = req.headers.authorization;

  if (!api_key) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const vQuery = "SELECT * FROM api_keys WHERE api_key = $1";
    const result = await pool.query(vQuery, [api_key]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const gQuery = "SELECT * FROM post_admins";
    const response = await pool.query(gQuery);

    return res.status(200).json({ message: response.rows });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error_messgae_500 });
  }
};