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
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
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
    const tQuery =
      "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2";
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const { name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, updated_at, phone_trainer, area_code } = req.body;
    const { id } = req.params; 
    const uQuery = "UPDATE admin_trainers SET name_trainer = $1, packages_trainer = $2, schedule_trainer = $3, info_trainer = $4, status_trainer = $5, updated_at = $6, phone_trainer = $7, area_code = $8 WHERE _id_trainer = $9";

    const response = await pool.query(uQuery, [name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, updated_at, phone_trainer, area_code, id]);

    if (response.rowCount === 0) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(200).json({ message: "Entrenador actualizado" });
  } catch (error) {
    return res.status(200).json({ message: error_messgae_500 });
  }
};

export const deleteTrainer = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Token inválido. Servicio denegado" });
    }

    const tQuery = 'SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2'
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const { id } = req.params;
    const dQuery = "DELETE FROM admin_trainers WHERE _id_trainer = $1";
    const response = await pool.query(dQuery, [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Entrenador no encontrado" });
    }

    return res.status(200).json({ message: "Entrenador eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error_messgae_500 });
  }
};


export const saveTrainer = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Token inválido. Servicio denegado" });
    }

    const tQuery = 'SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2'
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Token inválido. Servicio denegado" });
    }

    const verifiedIfSaved = "SELECT * FROM saved_trainers WHERE user_id = $1 and trainer_id = $2";
    const result2 = await pool.query(verifiedIfSaved, [decoded._id, req.body.trainer_id]);
    if (result2.rowCount > 0) {
      const unsavedQuery = "DELETE FROM saved_trainers WHERE user_id = $1 and trainer_id = $2";
      const response = await pool.query(unsavedQuery, [decoded._id, req.body.trainer_id]);

      if (response.rowCount === 0) {
        return res.status(400).json({ message: response.message });
      }

      return res.status(200).json({ message: "Entrenador no guardado" });
    } else {
      const { user_id, trainer_id, saved_at } = req.body;
      const id = crypto.randomUUID()
      const sQuery = "INSERT INTO saved_trainers (id, user_id, trainer_id, saved_at) VALUES ($1, $2, $3, $4)";
      const response = await pool.query(sQuery, [id.split("-")[0], user_id, trainer_id, saved_at]);
  
      if (response.rowCount === 0) {
        return res.status(400).json({ message: response.message });
      }
  
      return res.status(200).json({ message: "Entrenador guardado" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error_messgae_500 });
  }
}

export const stateTrainerSaved = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Token inválido. Servicio denegado" });
    }

    const tQuery = 'SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2' 
    const result = await pool.query(tQuery, [decoded._id, token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: error_messgae_401 });
    }

    const { id } = req.params;
    const sQuery = "SELECT * FROM saved_trainers WHERE user_id = $1 and trainer_id = $2";

    const savedOrnot = await pool.query(sQuery, [decoded._id, id]);

    if (savedOrnot.rowCount === 0) {
      return res.status(200).json({ message: "Entrenador no guardado", state: false });
    } else {
      return res.status(200).json({ message: "Entrenador guardado", state: true });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
