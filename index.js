const path = require('path');
const morgan = require('morgan');
const express = require('express');
const http = require('http');
const app = express();
const port = 3000;
const staticFolder = path.join(__dirname, 'public');
app.use(morgan('dev'));
app.use('/public', express.static(staticFolder));

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: staticFolder });
});

// HTTP server
var server = http.createServer(app);
server.listen(port, function () {
  console.log('HTTP server listening on port ' + port);
});


// WebSocket server
var io = require('socket.io')(server);
io.on('connection', require('./socket'));

module.exports.app = app;