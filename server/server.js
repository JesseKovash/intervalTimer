
import express from ('express');
import path from ('path');

export default app = express();

app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// module.exports = app;