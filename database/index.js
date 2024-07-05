import * as dotenv from "dotenv";
dotenv.config({path: "../.env"});

import pg from 'pg';

//Use connection pool
const { Pool } = pg;
const pool = new Pool();

export const query = async(query, params) => {
    //initialise client here so can always access in finally block
    let client = null
    try {
        client = await pool.connect()
        const res = await client.query(query, params) //params is an array
        console.log(res.rows)
        return res.rows
    } catch (err) {
        console.error(`Error querying database: ${err}`);
        return err
    } finally {
        if (client){
            client.release()
        }
    }
};

query("SELECT * FROM patients WHERE identifier = $1", [11111111])