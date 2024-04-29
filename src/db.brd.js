import pg from 'pg'
import { configDotenv } from 'dotenv';
configDotenv()

const { DATABASE_URL } = process.env;

const pool = new pg.Pool({ 
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((error, client, release) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }

  console.log("BRD/API | CONNECTED SUCCESSFULLY");
  release(); 
});



export default pool
