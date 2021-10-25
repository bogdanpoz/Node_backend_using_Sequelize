require('dotenv').config()
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const bodyParser = require('body-parser')
const lusca = require('lusca')
const cors = require('cors')
const sslRedirect = require('heroku-ssl-redirect').default;

const TestController = require('./controllers/test')
const ChainageController = require('./controllers/chainage')
const passport = require('./middleware/auth')

const app = express()
app.disable('x-powered-by')

// enable ssl redirect
app.use(sslRedirect());

app.use('/', serveStatic(path.join(__dirname, 'dist')))
app.use('/login', serveStatic(path.join(__dirname, 'dist')))
app.use('/about', serveStatic(path.join(__dirname, 'dist')))
app.use('/404', serveStatic(path.join(__dirname, 'dist')))
app.all('*', function (req, res, next) {
    if (req.url.includes('/api')) return next();
    else res.sendFile((path.join(__dirname, 'dist/index.html')))
})

const apiRouter = express.Router()
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
// apiRouter.use(lusca.xframe('SAMEORIGIN'))
// apiRouter.use(lusca.xssProtection(true))

apiRouter.get('/test', TestController.test)
apiRouter.get('/chainages', ChainageController.readDataFromIAuditor)

apiRouter.get('/auth', passport.authenticate('azure_ad_oauth2'));
apiRouter.get('/auth/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
    });
app.use('/api', apiRouter)

// const port = process.env.PORT || process.env.APP_PORT
const port = 8081
app.listen(port, err => {
    if (err) throw err;
    console.log("%c Server running", "color: green");
})

module.exports = {
    path: '/',
    handler: app
}