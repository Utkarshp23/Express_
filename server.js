var exp = require('express')
var bp = require('body-parser')
var app = exp();

// Build in Middleware
app.use(exp.static('images'))

//Custome middlewares

// --General middleware
app.use((req, res, next) => {
  console.log('Inside general Midleware 1')
  next()
})

app.use((req, res, next) => {
  var time = new Date()
  var reqUrl = req.path
  console.log(`${time}---@ ${reqUrl}`)
  next()
})


app.use('/images', (req, res, next) => {
  console.log("Sending images..")
  next()
})


// Third Party Middleware
app.use(bp.urlencoded({ extended: false }))


app.get('/greet', (req, res) => {
  res.send("Welcome to progressive Web App")
})

app.get('/login', (req, res) => {
  console.log("request recieved...")
  res.sendFile(__dirname + '/userForm.html')
})

app.get('/logincheck', (req, res) => {
  console.log(req.query.name)
  console.log(req.query.email)
})

app.post('/logincheck', (req, res) => {
  console.log(req.body.name)
  console.log(req.body.email)

  var name = req.body.name;
  var email = req.body.email;

  if (name == "Utkarsh Pawar" && email == "utkarshpawar2332@gmail.com")
    res.send(`Succesful Login... <br> <h3>Welcome ${name} </h3>`)
  else {
    res.send('Unsuccesful attempt....')
  }
})

// Using static middleware
app.get('/images', (req, res) => {
  res.send("<img src='browser.png'/>")
})

app.all('*', (req, res) => {
  res.send('Page Not Found')
})
// app.post('/login', (req, res) => {
//   console.log(req.body)
// })

app.listen(9000, '0.0.0.0', console.log("Server started..."))