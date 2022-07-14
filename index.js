const express = require('express')
const path = require('path')
const wiyagarana = require('./routers/wiyagarana')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/wiyagarana',express.static(path.join(__dirname, 'public/pages/wiyagarana')))
  .use('/wiyagarana',wiyagarana)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
