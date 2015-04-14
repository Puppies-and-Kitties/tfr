var app = require('./server/config.js')
var port = 8888;
app.listen(port, function() {
  console.log("On port ", port);
})

