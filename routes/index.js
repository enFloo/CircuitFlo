const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) =>{
    res.render('login', {
        layout: 'login',
    })
})

//@desc     Dashboard
//@route    Get /dashboard
router.get('/dashboard', ensureAuth, (req, res) =>{
    console.log(req.User)
    res.render('dashboard')
})

//@desc     Public Pr's
//@route    Get /publicpr
router.get('/publicprs', ensureAuth, (req, res) =>{
    res.render('publicprs')
})

module.exports = router

