import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.brd.js";
import { error_messgae_500 } from "../config.brd.js";
export const getPackages = async (req, res) => {
    const token = req.headers.authorization;
    const { page } = req.params

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

        const gQuery = `SELECT * FROM admin_packages ORDER BY created_at ASC LIMIT 10 OFFSET (${page} - 1) * 10`;
        const response = await pool.query(gQuery);

        return res.status(200).json({ message: response.rows });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error_messgae_500 });
    }
}