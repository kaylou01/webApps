const dataBase = require('./database.js');

module.exports ={

    create (titlePost, post, filename, userID, sendBack){
        dataBase.connect().then((db)=>{

            if(filename !== null){
                db.run('INSERT INTO images (filepath) VALUES (?)',
            filename
            ).then( results =>{
                db.run('INSERT INTO posts (title, body, image_id, user_id) VALUES(?,?,?,?)',
                titlePost,
                post,
                results.lastID,
                userID
                ). then(results => {
                    sendBack(results)
                })
                console.log(results)

            })
            } else {
                db.run('INSERT INTO posts (title, body, user_id) VALUES(?,?,?)',
                titlePost,
                post,
                userID
                ). then(results => {
                    sendBack(results)
                })
            
            }
            

        })
    }, 
   
    getAll(offset,limit, sendBack){
        dataBase.connect().then((db)=>{
            db.all('SELECT posts.id, posts.title, posts.body, posts.image_id, posts.user_id, images.filepath FROM posts JOIN images ON posts.image_id = images.id ORDER BY posts.id DESC LIMIT ? OFFSET ?',
            limit,
            offset,
            ). then(results => {
                sendBack(results)
            })
        })
    },

    getSingle(postId, sendBack){
        console.log(postId)
        dataBase.connect().then((db)=>{
            db.get('SELECT * FROM posts JOIN images ON posts.image_id = images.id WHERE posts.id= ?',
            postId,
            ). then(results => {
                sendBack(results)
            })
        })
    },

    createComment(postID, comment, userId, sendBack){
        console.log(comment)
        dataBase.connect().then((db)=>{
            db.run('INSERT INTO comments (post_id, body, user_id) VALUES (?,?,?)',
            postID,
            comment,
            userId
            ). then(results => {
                sendBack(results)
            })
        })
    },

    getComment( postID, comment, sendBack){
        dataBase.connect().then((db) =>{
            db.get('SELECT comments.id, comments.body FROM comments', 
            postID,
            comment,
            ).then(results =>{
                sendBack(results)
            })
        })
    }

}