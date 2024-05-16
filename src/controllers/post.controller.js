import pool from "../db.brd.js"
import { error_messgae_400, error_messgae_500, error_messgae_401 } from "../config.brd.js"
const { SECRET_KEY } = process.env
import jwt from "jsonwebtoken"

export const getPosts = async (req, res) => {
    try {
        const token = req.headers.authorization
        
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token" })
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(tQuery, [decoded._id, token])
        
        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        const { id } = req.params
        const cQuery = 'SELECT * FROM post_admins WHERE uuid = $1'
        const response = await pool.query(cQuery, [id])

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        return res.status(200).json({ message: response.rows })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error_messgae_500 })
    }
}

export const updatePost = async (req, res) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó un token" })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(tQuery, [decoded._id, token])

        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        const { id } = req.params
        const { title_post, description_post, labels } = req.body
        const uQuery = 'UPDATE post_admins SET title_post = $1, description_post = $2, labels = $3 WHERE uuid = $4'
        const response = await pool.query(uQuery, [title_post, description_post, labels, id])

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        return res.status(200).json({ message: 'Post actualizado' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error_messgae_500 })
    }
}