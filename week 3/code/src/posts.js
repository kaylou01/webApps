const dataBase = require('./database.js');

module.exports ={

    posts (titlePost, post, sendBack){
        dataBase.connect().then((db)=>{
            db.run('INSERT INTO posts ("title", "body") VALUES(?,?)',
            titlePost,
            post,
            ). then(results => {
                sendBack(results)
            })
        })
    }

}