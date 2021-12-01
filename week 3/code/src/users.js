const dataBase = require('./database.js');
const UUID = require('uuid');

module.exports={
    login (username, password, sendBack) {
        dataBase.connect().then((db) => {
    
       // console.log(db,username,password)
        db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
            sendBack(result)
    
        //console.log(result);

        if(result && !result.userToken){
            let userToken = UUID.v4();
              db.run('UPDATE users SET token = ? WHERE id = ?', userToken, result.id).then (() =>{
                result.userToken = userToken;
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
        db.connect('SELECT * FROM users where token =?', userToken).then(result =>{
            sendBack(result)
        }).catch(err =>{
            console.log('users.findUserToken failed with error:' + err)
            //sendBack(false)
        })
    }
}



