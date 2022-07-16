const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '159626839025-860e2eq8l5f93pr0664gtkoupbmahct5.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET ='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'
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/return",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //user authenticate from own db
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    //null->err if user authenticate from db
    return done(null,profile)
  }
));

passport.serializeUser((user, done)=>{
    done(null,user)
})

passport.deserializeUser((user, done)=>{
    done(null,user)
})

