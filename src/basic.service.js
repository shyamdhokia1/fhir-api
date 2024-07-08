const { BasicStrategy } = require('passport-http');
const db = require('../database/index.js');

module.exports.strategy = new BasicStrategy(async(username, password, done) => {
    console.log(username, password)
    const res = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2',[username, password])
    console.log(res)
    if (res.length > 0){
        return done(null, {});
	} else {
		return done(new Error('Invalid Username/Password'));
	}
});