const express = require('express')

const app = express()
app.get('/api/xyx/info', (req, res)=> {
  res.json({
    name: 'webpack'
  })
})
app.listen(3000)