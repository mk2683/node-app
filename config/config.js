var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

// var env = process.env.NODE_ENV || 'development';

// if (env === 'development') {
//   process.env.PORT = 5000;
//   process.env.MONGOLAB_URI = "mongodb://localhost:27017/MediEdge";
// } else if (env === 'test') {
//   process.env.PORT = 5000;
//   // process.env.MONGOLAB_URI = "mongodb://localhost:27017/MediEdgeTest";
// }