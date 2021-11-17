const dataBase = require('./database.js');
const UUID = require('uuid');

module.exports={
    login (username, password, sendBack) {
        dataBase.connect().then((db) => {
    
       // console.log(db,username,password)
        db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
            sendBack(result)
        })
        //console.log(result);

        //if(result){
            //let userToken = UUID.v4();
              //db.run('UPDATE users SET user_profile_id = ? WHERE id = ?', userToken, result.user_profile_id).then (() =>{
                //result.userToken = userToken;
                //sendBack(updateResult);
           //})
       // } else {
           // sendBack(result)
           //}
        }).catch(err => {
            console.log('users.login failed with error:' + err)
        })
    } 
}



