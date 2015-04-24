var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = require('./config.js');

module.exports = function(app, express) {
  var userRouter = express.Router();
  var candidateRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static('www'));
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });
  
  //user router for user requests (ie. initial login, update prefs)
  app.use('/user', userRouter);

  // candidate router for user's potential candidates
  app.use('/candidates', candidateRouter);

  require('./users/userRoutes.js')(userRouter);
  require('./candidates/candidateRoutes.js')(candidateRouter);
};
