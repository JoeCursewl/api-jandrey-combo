import app from "./app.js";
import { configDotenv } from 'dotenv';
configDotenv()

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
    console.log(`API RUNNING AT PORT ${API_PORT}`);
  });
  