var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = require('./config.js');

module.exports = function(app, express) {
  var userRouter = express.Router();
  var candidateRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '../www'));

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });
  
  app.use('/user', userRouter);  //user router for user requests (ie. initial login, update prefs)
  app.use('/candidates', candidateRouter); // candidate router for user's potential candidates

  require('./users/userRoutes.js')(userRouter);
  require('./candidates/candidateRoutes.js')(candidateRouter);
};
