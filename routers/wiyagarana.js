const express = require('express')

const router = express.Router();

router.get('/santhi',(req, res)=> {res.render("pages/wiyagarana/santhi")})

module.exports = router;