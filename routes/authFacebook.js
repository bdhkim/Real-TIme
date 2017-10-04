/**
 * Created by paulngouchet on 6/23/17.
 */

// config/auth.js


// config/passport.js



const express = require('express')
const router = express.Router()


 //route for logging out
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



module.exports = router









