import pool from "../db.brd.js";
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
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
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

    const gQuery = "SELECT * FROM post_admins ORDER BY created_at ASC";
    const response = await pool.query(gQuery);

    return res.status(200).json({ message: response.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const registerPackages = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    const uuid = crypto.randomUUID();
    const {
      _id_user,
      name_package,
      description_package,
      price_package,
      created_at,
      name_user,
    } = req.body;

    const iQuery =
      "INSERT INTO admin_packages VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const response = await pool.query(iQuery, [
      uuid,
      _id_user,
      name_package,
      description_package,
      price_package,
      created_at,
      name_user,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(200).json({
      uuid: uuid,
      _id_user: _id_user,
      name_package: name_package,
      description_package: description_package,
      price_package: price_package,
      created_at: created_at,
      name_user: name_user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const registerTrainers = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    const {
      _id_trainer,
      _id_user,
      name_trainer,
      packages_trainer,
      schedule_trainer,
      info_trainer,
      status_trainer,
      created_at,
      updated_at,
    } = req.body;

    const iQuery =
      "INSERT INTO admin_trainers VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const response = await pool.query(iQuery, [
      _id_trainer,
      _id_user,
      name_trainer,
      packages_trainer,
      schedule_trainer,
      info_trainer,
      status_trainer,
      created_at,
      updated_at,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(200).json({
      _id_trainer: _id_trainer,
      _id_user: _id_user,
      name_trainer: name_trainer,
      packages_trainer: packages_trainer,
      schedule_trainer: schedule_trainer,
      info_trainer: info_trainer,
      status_trainer: status_trainer,
      created_at: created_at,
      updated_at: updated_at,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const registerInformation = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }
    const _id_info = crypto.randomUUID();
    const {
      _id_user,
      name_contact,
      description_contact,
      email_contact,
      phones_contact,
      stauts_contact,
      created_at,
      updated_at,
    } = req.body;

    const iQuery =
      "INSERT INTO admin_information VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const response = await pool.query(iQuery, [
      _id_info,
      _id_user,
      name_contact, 
      description_contact,
      email_contact,
      phones_contact,
      stauts_contact,
      created_at,
      updated_at,
    ]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(200).json({
      _id_info: _id_info,
      _id_user: _id_user,
      name_contact: name_contact,
      description_contact: description_contact,
      email_contact: email_contact,
      phones_contact: phones_contact,
      stauts_contact: stauts_contact,
      created_at: created_at,
      updated_at: updated_at,
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error_messgae_500 });
  }
};

export const updateInformation = async (req, res) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "No se encuentra el ID" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    const { name_contact, description_contact, email_contact, phones_contact, status_contact, updated_at } = req.body;
    const iQuery = "UPDATE admin_information SET name_contact = $1, description_contact = $2, email_contact = $3, phones_contact = $4, status_contact = $5, update_at = $6 WHERE _id_info = $7";
    const response = await pool.query(iQuery, [name_contact, description_contact, email_contact, phones_contact, status_contact, updated_at, id]);
    
    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(200).json({ message: "Information con exitosamente actualizada!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getInformationById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "No se encuentra el ID" });
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
  }

  try {

    const decoded = jwt.verify(token, SECRET_KEY);
    const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "INVALID TOKEN REJECTED" });
    }

    const iQuery = "SELECT * FROM admin_information WHERE _id_info = $1";
    const response = await pool.query(iQuery, [id]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: `Information con el ID ${id} no existe` });
    }

    return res.status(200).json({ message: response.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}
