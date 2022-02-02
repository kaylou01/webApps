const UUID = require('uuid')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, UUID.v4() + '-' + file.originalname)
  }
})
const upload = multer({
  storage: storage
})
///////
const express = require('express')
const app = express()
const port = 3000

// You can require your own code as well...
const funcs = require('./src/funcs.js');
const database = require('./src/database.js');
const Users = require('./src/users.js');
const post = require('./src/posts.js');
const users = require('./src/users.js');
const { likes } = require('./src/posts.js');
database.connect()

// Tell Express to server HTML, JS, CSS etc from the public/ folder
// See: http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Our API routes will be here
app.get('/api/hello', function (req, res) {
  // Return the response by calling our function
  res.send(funcs.myFunction());
})

app.post('/api/login', function (req, res) {
  console.log(req.body);
  res.status(200);
  //let loggin = false;
  users.login(req.body.username, req.body.password, result => {
    console.log(result)
    if(!result){
      result = false
    }
    res.status(200).json(result);
  })
})

app.post('/api/register', (req, res) => {
  console.log(req.params.username)
  users.register(req.body.username, req.body.password, (result) => {
    res.json(result)
  })
  console.log(req.body)
})


app.post('/api/posts', upload.single('image'),function (req, res){
console.log(req.body, req.file);
let apiToken = req.get('X-API-Token')
Users.findUserToken(apiToken, user =>{
  if(user){
    if(req.file){
      post.create(req.body.title_posts, req.body.post, req.file.filename, user.id, result =>{
        res.status(200).json(result);
       })
    } else{
      post.create(req.body.title_posts, req.body.post, null, user.id, result =>{
        res.status(200).json(result);
       })
    }
   
  } else{
    res.status(401).send({msg: "could not find this user"})
  }
  })
})


app.get('/api/posts', (req, res)=>{
  let offset = req.query.offset
  let limit = 5
  post.getAll(offset, limit, (result) =>{
    console.log(result)
    res.json(result);
  })
})

app.get('/api/post/:id', (req, res)=>{
  let apiToken = req.get('X-API-Token')
  Users.findUserToken(apiToken, user =>{
    post.getSingle(req.params.id, user.id, (result) =>{
      console.log(result)
      res.json(result)
    })
  })
})

app.post('/api/post/:id/comment', (req, res)=> {
  console.log(req.body);
  let apiToken = req.get('X-API-Token')
  Users.findUserToken(apiToken, user =>{
    post.createComment(req.params.id, req.body.comment, user.id, result =>{
      console.log(result);
      res.status(200).json(result);
    })
  })
 
})

app.get('/api/post/:id/comment', (req, res) => {
  post.getAllComments(req.params.id, (result) => {
    console.log(result)
    res.json(result)
  })
})

app.delete('/api/comment', (req, res) =>{
  let apiToken = req.get("X-API-Token");
  users.findUserToken(apiToken, user => {
    let comment_id = req.query.comment_id
    post.userDeleteComment(comment_id, user.id, (canDelete) => {
      if(canDelete){
        post.deleteComment(comment_id, (result)=>{
          console.log("delete comment", result)
          res.status(200).json(result);
        })
      } else {
        res.status(403)
      }
    })
  })
})

// app.post('api/like', function (req, res){
//   let apiToken = req.get("X-API-Token");
//   users.findUserToken(apiToken, user => {
//   post.likes(req.query.postId, user.id , (result) => {
//     res.status(200).json(result);
//   })
//   })
// })

// app.get('api/likeCounter', function (req, res){
//   post.likeCount(req.query.postId, (result) => {
//     res.status(200).json(result);
//   })
// })




// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)
