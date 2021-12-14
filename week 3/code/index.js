const express = require('express')
const app = express()
const port = 3000

// You can require your own code as well...
const funcs = require('./src/funcs.js');
const database = require('./src/database.js');
const Users = require('./src/users.js');
const post = require('./src/posts.js')
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
  Users.login(req.body.username, req.body.password, result => {
    console.log(result)
    if(!result){
      result = false
    }
    res.status(200).json(result);
  })
})

app.post('/api/posts', function (req, res){
console.log(req.body);
post.create(req.body.title, req.body.body, result =>{
  console.log(result)
  res.status(200).json(result);
})

})

app.get('/api/posts', (req, res)=>{
  let offset = req.query.offset
  let limit = 10
  post.getAll(offset, limit, (result) =>{
    //console.log(result)
    //console.log("hello")
    res.json({result});
  })
})

// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)
