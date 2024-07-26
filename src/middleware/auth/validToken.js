import jwt from 'jsonwebtoken'

export const validToken = (token, key) => {
    try {
         const decoded = jwt.verify(token, key);
        
         if (!decoded) {
             return { error: true }
         }

         return { decoded: decoded }
    } catch (error) {
        return { error: true }
    }
}