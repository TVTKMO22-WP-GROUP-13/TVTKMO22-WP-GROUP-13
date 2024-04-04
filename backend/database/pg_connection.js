require('dotenv').config();

console.log('Database password is:', process.env.PG_PASSWORD);
console.log('Database user is:', process.env.PG_USER);
console.log('Database host is:', process.env.PG_HOST);
console.log('Database port is:', process.env.PG_PORT);
console.log('Database name is:', process.env.PG_DATABASE);
console.log('Database jwt secret is:', process.env.JWT_SECRET);


const {Pool} = require('pg');

const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: true
});

pgPool.connect( (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log("Postgre connection ready");
    }
});

module.exports = pgPool;