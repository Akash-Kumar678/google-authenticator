const express = require('express')
const passport = require('passport')
const session = require('express-session')
require('./authenticator')
const app = express()
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())
function loginCheck(req,res,next){
    req.user ? next(): res.sendStatus(401)
}

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Login using google </a>')
})
app.get('/google/return',passport.authenticate('google',{successRedirect:'/user',failureRedirect:'/'}))

app.get('/auth/google',passport.authenticate('google',{ scope:['email','profile']}))

app.get('/user',loginCheck,(req,res)=>{
        //generate token maintain session
        //redirect to user homepage
        res.send(`you are logged in : ${req.user.displayName}  ${req.user.emails[0].value}   <a href="/logout">Logout </a> `)
})
app.get('/logout',function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })

app.listen(process.env.PORT || 3000,()=>{
    console.log(`post running at : 8000`)
})
