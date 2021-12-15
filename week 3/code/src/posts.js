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
    getAll(offset,limit,sendBack){
        dataBase.connect().then((db)=>{
            db.all('SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?',
            limit,
            offset,
            ). then(results => {
                sendBack(results)
            })
        })
    }

}