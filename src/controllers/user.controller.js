import pool from "../db.brd.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import {
  error_messgae_500,
  error_messgae_401,
  error_messgae_400,
  hashingPassword,
  date,
} from "../config.brd.js";
export const registerUsers = async (req, res) => {
  try {
    const { _id, name, last_name, email, password, created_at, role } = req.body;

    const verificationQuery = "SELECT * FROM users WHERE email = $1 OR name = $2";
    const result = await pool.query(verificationQuery, [email, name]);

    if (result.rowCount > 0) {
      return res.status(400).json({ message: error_messgae_400 });
    }

    const rQuery = "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const { hPassword } = await hashingPassword(password);
    await pool.query(rQuery, [
      _id,
      name,
      last_name,
      email,
      hPassword,
      created_at,
      role
    ]);

    return res.status(200).json({
      _id: _id,
      name: name,
      last_name: last_name,
      email: email,
      password: hPassword,
      created_at: created_at,
      role: role
    });
  } catch (error) {
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lQuery = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(lQuery, [email]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const storedPassword = result.rows[0].password;

    const passwordMatch = await argon2.verify(storedPassword, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, _role: user._role },
      SECRET_KEY,
      { expiresIn: "8h" },
      async (error, token) => {
        if (error) console.log(error);

        const tQuery = "INSERT INTO sessiontokens VALUES ($1, $2, $3, $4)";
        const result_token = await pool.query(tQuery, [
          token,
          user._id,
          crypto.randomUUID(),
          date.toLocaleDateString(),
        ]);

        if (result_token.rowCount === 0) {
          return res.status(400).json({ message: error_messgae_400 });
        }

        return res.status(200).json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = 'SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2'
    const result = await pool.query(tQuery, [decoded._id, token]);
    
    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    return res.status(200).json({ message: decoded });
  } catch (error) {
    return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
  }
};
