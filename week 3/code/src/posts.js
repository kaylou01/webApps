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

    getSingle(postId, userId, sendBack) {
        dataBase.connect().then((db)=>{
            db.get('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', userId, postId).then(like => {
                db.get('SELECT * FROM posts LEFT JOIN images ON posts.image_id = images.id WHERE posts.id= ?', postId).then(post => {
                    if (like) {                        
                        post.liked = true;
                    }
                    else {
                        post.liked = false;
                    }
                    sendBack(post)
                })
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

    getAllComments(postID, sendBack){
        dataBase.connect().then((db)=>{
            db.all('SELECT comments.id, comments.body FROM comments WHERE comments.post_id = ?',
            postID,
            ). then(results => {
                sendBack(results)
            })
        })
    },

    likes(userId, postId, sendBack){
        dataBase.connect().then((db)=> {
            db.run('INSERT INTO likes (user_id, post_id) VALUES (?,?)',
            userId,
            postId) .then(results => {
                sendBack(results)
            })
            
        })
    },


}