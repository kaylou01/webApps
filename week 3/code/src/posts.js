const dataBase = require('./database.js');

module.exports ={

    create (titlePost, post, filename, sendBack){
        dataBase.connect().then((db)=>{

            db.run('INSERT INTO images (filepath) VALUES (?)',
            filename
            ).then( results =>{
                db.run('INSERT INTO posts (title, body, image_id) VALUES(?,?,?)',
                titlePost,
                post,
                results.lastID
                ). then(results => {
                    sendBack(results)
                })
                console.log(results)

            })

        })
    }, 
   
    getAll(offset,limit, sendBack){
        dataBase.connect().then((db)=>{
            db.all('SELECT * FROM posts JOIN images ON posts.image_id = images.id ORDER BY id DESC LIMIT ? OFFSET ?',
            limit,
            offset,
            ). then(results => {
                sendBack(results)
            })
        })
    }

}