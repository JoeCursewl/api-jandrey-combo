import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import {
  error_messgae_400,
  error_messgae_401,
  error_messgae_500,
} from "../config.brd.js";
import pool from "../db.brd.js";

export const getTrainer = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    } 

    const { id } = req.params;
    const gQuery = "SELECT * FROM admin_trainers WHERE _id_trainer = $1";
    const response = await pool.query(gQuery, [id]);
    
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "No se encontró el entrenador" });
    }

    return res.status(200).json({ message: response.rows });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error_messgae_500 });
    }
};

export const updateTrainer = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const { id } = req.params;
    const { name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, updated_at } = req.body;
    const uQuery = "UPDATE admin_trainers SET name_trainer = $1, packages_trainer = $2, schedule_trainer = $3, info_trainer = $4, status_trainer = $5, updated_at = $6 WHERE _id_trainer = $7";
    const response = await pool.query(uQuery, [name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, updated_at, id]);

    return res.status(200).json({ message: "Entrenador actualizado" });
  } catch (error) {
    return res.stauts(200).json({ message: error_messgae_500 });
  }
}
