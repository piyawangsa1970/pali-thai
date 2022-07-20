const express = require('express')

const router = express.Router();

router.get('/sumaugkara',(req, res)=> {res.render("pages/modals/sumaugkara")})

module.exports = router;