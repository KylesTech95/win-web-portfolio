import 'dotenv/config'
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DBU,
    database: process.env.DB,
    password: process.env.PD,
    port: process.env.DBP,
    host:process.env.DBH 
})

// console.log(pool)

export default pool