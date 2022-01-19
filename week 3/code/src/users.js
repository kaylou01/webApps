const dataBase = require('./database.js');
const UUID = require('uuid');

module.exports={
    login (username, password, sendBack) {
        dataBase.connect().then((db) => {
    
       // console.log(db,username,password)
        db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
            sendBack(result)
    
        //console.log(result);

        if(result && !result.token){
            let token = UUID.v4();
            console.log("hello")
            console.log(result)
              db.run('UPDATE users SET token = ? WHERE id = ?', token, result.id).then (() =>{
                result.token = token;
                sendBack(result);
           })
        } else {
            sendBack(result)
           }
        }).catch(err => {
            console.log('users.login failed with error:' + err)
            })
        })
    },
    findUserToken(userToken, sendBack){
        dataBase.connect().then((db) => {
            db.get('SELECT * FROM users WHERE token =?', userToken).then(result =>{
                sendBack(result)
            }).catch(err =>{
                console.log('users.findUserToken failed with error:' + err)
                //sendBack(false)
            })
        })
    }
}



