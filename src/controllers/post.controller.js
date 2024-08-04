import pool from "../db.brd.js"
import { error_messgae_400, error_messgae_500, error_messgae_401 } from "../config.brd.js"
const { SECRET_KEY } = process.env
import jwt from "jsonwebtoken"
import { compile } from "morgan"
import { validToken } from "../middleware/auth/validToken.js"

export const getPosts = async (req, res) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token" })
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(tQuery, [decoded._id, token])
        
        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        const { id } = req.params;
        const cQuery = 'SELECT * FROM post_admins WHERE uuid = $1'
        const response = await pool.query(cQuery, [id]);

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
        const { title_post, description_post, labels, updated_at } = req.body
        const uQuery = 'UPDATE post_admins SET title_post = $1, description_post = $2, labels = $3, updated_at = $4 WHERE uuid = $5'
        const response = await pool.query(uQuery, [title_post, description_post, labels, updated_at, id])

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        return res.status(200).json({ message: 'Post actualizado' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error_messgae_500 })
    }
}

export const deletePost = async (req, res) => {
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
        const dQuery = 'DELETE FROM post_admins WHERE uuid = $1'
        const response = await pool.query(dQuery, [id])

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        return res.status(200).json({ message: 'Post eliminado' })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error_messgae_500 })
    }
}

export const likePost = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó un token. Servidor no autorizado" })
    }

    try {
        
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "El token no es válido. Servicio no autorizado." })
        }

        const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(tQuery, [decoded._id, token])

        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        // Registramos el like que se dió al post
        const { post_id } = req.params;
        const { created_at } = req.body;

        const verifyLikeQuery = 'SELECT * FROM fg_likes WHERE post_id = $1 and user_id = $2'
        const verifyLikeResponse = await pool.query(verifyLikeQuery, [post_id, decoded._id])

        if (verifyLikeResponse.rowCount > 0) {
            const dLikeQuery = 'DELETE FROM fg_likes WHERE post_id = $1 and user_id = $2'
            const dLikeResponse = await pool.query(dLikeQuery, [post_id, decoded._id])
            return res.status(200).json({ message: 'Like eliminado', like: false })
        } else {
            let iLikeQuery = 'INSERT INTO fg_likes (post_id, user_id, created_at) VALUES ($1, $2, $3)'
            const iLikeResponse = await pool.query(iLikeQuery, [post_id, decoded._id, created_at])
            return res.status(200).json({ message: 'Like registrado', like: true })
        }

    } catch (error) {
        console.log(`BRD | ERROR GIVE LIKE: ${error.message}`)
        return res.status(500).json({ message: error_messgae_500 })
    }
}


export const verifiedLike = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token. Servidor no autorizado" })
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "El token no es válido. Servicio no autorizado." })
        }

        const tQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(tQuery, [decoded._id, token])
        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        const { post_id } = req.params;
        const verifyLikeQuery = 'SELECT * FROM fg_likes WHERE post_id = $1 and user_id = $2'
        const verifyLikeResponse = await pool.query(verifyLikeQuery, [post_id, decoded._id])

        if (verifyLikeResponse.rowCount > 0) {
            return res.status(200).json({ like: true })
        } else {
            return res.status(200).json({ like: false })
        }
    } catch (error) {
        console.log(`BRD | ERROR VERIFIED LIKE: ${error.message}`)
        return res.status(500).json({ message: `Ha ocurrido un error. ${error.message}` })   
    }
}


export const insertComment = async (req, res) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token. Servidor no autorizado" })
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "El token no es válido. Servicio no autorizado." })
        }
    
        const vQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(vQuery, [decoded._id, token])
        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }
    
        const { post_id } = req.params;
        const { comment_content, created_at, updated_at } = req.body;
    
        const iCommentQuery = 'INSERT INTO fg_comments (comment_content, user_id, post_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';
        const iCommentResponse = await pool.query(iCommentQuery, [comment_content, decoded._id, post_id, created_at, updated_at]);
    
        if (iCommentResponse.rowCount === 0) {
            return res.status(400).json({ message: 'No se pudo registrar el comentario. Intente de nuevo!' })
        }
    
        return res.status(200).json({ message: 'Comentario registrado' })
    } catch (error) {
        console.log(`BRD | ERROR INSERT COMMENT: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}

export const getAllComments = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token. Servidor no autorizado" })
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "El token no es válido. Servicio no autorizado." })
        }

        const vQuery = "SELECT * FROM sessiontokens WHERE _id_user = $1 and stoken = $2"
        const result = await pool.query(vQuery, [decoded._id, token])
        if (result.rowCount === 0) {
            return res.status(401).json({ message: error_messgae_401 })
        }

        const { post_id } = req.params;
        const cQuery = `
        SELECT 
            fc.*, 
            u.name, 
            u.email
        FROM 
            fg_comments fc
        INNER JOIN users u ON fc.user_id = u._id
        WHERE 
            fc.post_id = $1;
    `;
        const response = await pool.query(cQuery, [post_id]);

        return res.status(200).json({ comments: response.rows })
    } catch (error) {
        console.log(`BRD | ERROR GET COMMENTS: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}

