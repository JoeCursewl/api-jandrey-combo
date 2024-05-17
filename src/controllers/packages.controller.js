import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import {
  error_messgae_400,
  error_messgae_401,
  error_messgae_500,
} from "../config.brd.js";
import pool from "../db.brd.js";
import e from "express";

export const getPackage = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }
    const { id } = req.params;
    const gQuery = "SELECT * FROM admin_packages WHERE _id_package = $1";
    const response = await pool.query(gQuery, [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "No se encontró el paquete" });
    }

    return res.status(200).json({ message: response.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const updatePackage = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      res.status(401).json({ message: error_messgae_401 });
    }

    const { id } = req.params;
    const { name_package, description_package, price_package } = req.body;
    const uQuery =
      "UPDATE admin_packages SET name_package = $1, description_package = $2, price_package = $3 WHERE _id_package = $4";
    const response = await pool.query(uQuery, [
      name_package,
      description_package,
      price_package,
      id,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: error_messgae_400 });
    }

    return res.status(200).json({ message: "Paquete actualizado" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const deletePackage = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const { id } = req.params;
    const dQuery = "DELETE FROM admin_packages WHERE _id_package = $1";
    const response = await pool.query(dQuery, [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Paquete no encontrado" });
    }

    return res.status(200).json({ message: "Paquete eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};
