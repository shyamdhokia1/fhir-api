require('dotenv').config()
const pg = require('pg');

// Use connection pool
const { Pool } = pg;
const pool = new Pool();

const query = async(query, params) => {
    // initialise client here so can access in finally block
    let client = null
    try {
        client = await pool.connect()
        const res = await client.query(query, params) // params is an array
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

module.exports = { query };