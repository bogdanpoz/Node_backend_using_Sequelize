
const AzureAdOAuth2Strategy  = require("passport-azure-ad-oauth2");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const env = require('../config/env.js');

passport.use(new AzureAdOAuth2Strategy({
    clientID: env.azure.clientID,
    clientSecret: env.azure.clientSecret,
    callbackURL: env.azure.callbackURL,
    },
    function (accessToken, refresh_token, params, profile, done) {
        var waadProfile = profile || jwt.decode(params.id_token, '', true);
        console.log("---user profile-->", profile);
        console.log("---user params-->", params);
        console.log("---user info-->", waadProfile);
        // User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
        //     done(err, user);
        // });
    })
);
module.exports = passport;