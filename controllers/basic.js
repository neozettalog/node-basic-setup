const express = require('express')
const router = express.Router()
const { authenticateJWT } = require('../helpers/auth_helper');

//Get with JWT Authenticate
router.get('/', authenticateJWT, async (req, res) => {
    const user_id = req.user.id;
    try {
        return res.json({
            "data": user_id,
            "status": 200,
            "msg": "OK",
            "error": false
        })
    } catch (error) {
        return res.status(400).json({
            "data": {},
            "status": 400,
            "msg": await handleErrorMessageAPI(user_id, error),
            "error": true
        });
    }
});


//Get with NO JWT Authenticate
router.get('/', async (req, res) => {
    try {
        return res.json({
            "data": "NO JWT Authenticate",
            "status": 200,
            "msg": "OK",
            "error": false
        })
    } catch (error) {
        return res.status(400).json({
            "data": {},
            "status": 400,
            "msg": await handleErrorMessageAPI(user_id, error),
            "error": true
        });
    }
});