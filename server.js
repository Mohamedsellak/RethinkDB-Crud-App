require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const UserController = require('./controllers/UserController')
const User = new UserController()

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())


// to serve static fils
app.use(express.static('public'))


app.use(expressLayouts)
// Specify the layout file within the "layouts" folder
app.set('layout', 'layouts/app');

//  set the view engine 
app.set('view engine','ejs')
// Specify the views files within the "views" folder
app.set('views',  __dirname + '/views');




app.get('/',(req,res)=>User.getAllUsers(req,res))

app.get('/create',(req,res)=> res.render('create',{pageTitle:'Create User'}))

app.post('/user/create',(req,res)=>User.createUsers(req,res))

app.get('/update/:id',(req,res)=> User.getUserById(req,res))

app.post('/user/update/:id',(req,res)=> User.updateUser(req, res))

app.post('/user/delete/:id',(req,res)=> User.deleteUser(req, res))

app.listen(port ,()=>{
    console.log(`Server is Running on Port ${port}`)
})
