const dataBase = require('./database.js');

module.exports ={

    create (titlePost, post, sendBack){
        dataBase.connect().then((db)=>{
            db.run('INSERT INTO posts ("title", "body") VALUES(?,?)',
            titlePost,
            post,
            ). then(results => {
                sendBack(results)
            })
        })
    }, 
    getAll(sendBack){
        dataBase.connect().then((db)=>{
            db.all('SELECT * FROM posts'). then(results => {
                sendBack(results)
            })
        })
    }

}