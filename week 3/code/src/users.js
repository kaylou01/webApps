const dataBase = require('./database.js');
const UUID = require('uuid');

module.exports={
    login (username, password) {
        dataBase.connect().then(async (db) => {
    
        console.log(db,username,password)
        const result = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password)
        console.log(result)
        })
    }
}



