import app from './server.js';
import express from 'express';
// const app = express()
const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})