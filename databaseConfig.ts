import { Pool } from "@neondatabase/serverless"
  
const pool = new Pool({ 
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionString: process.env.POSTGRES_URL, 
    connectionTimeoutMillis: 2000,    
  })

  export default pool;