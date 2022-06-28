/* eslint-disable  camelcase */
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';

mongoose.Promise = global.Promise;

// MONGODB
// Connections
const DB_PARAMS = {
  M1: process.env.MONGO_SERVER_1 ? process.env.MONGO_SERVER_1 : 'localhost:27017',
  M2: process.env.MONGO_SERVER_2 ? process.env.MONGO_SERVER_2 : 'localhost:27018',
  M3: process.env.MONGO_SERVER_3 ? process.env.MONGO_SERVER_3 : 'localhost:27019',
  USERNAME: process.env.DBS_USER_NAME ? process.env.DBS_USER_NAME : 'Set app username here',
  PASSW: process.env.DBS_USER_PASSW ? process.env.DBS_USER_PASSW : 'Set app userpassword here',
  DB: process.env.DBS_NAME ? process.env.DBS_NAME : 'Set dbs name here',
  RS: process.env.REPLICA_SET ? process.env.REPLICA_SET : 'Set replica set name here',
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    connectTimeoutMS: 30000
  }
};

const DB_CONNECTION = {
  URL: `mongodb://${DB_PARAMS.USERNAME}:${DB_PARAMS.PASSW}@${DB_PARAMS.M1},${DB_PARAMS.M2},${DB_PARAMS.M3}/${DB_PARAMS.DB}?replicaSet=${DB_PARAMS.RS}`,
  OPTIONS: DB_PARAMS.OPTIONS
};

glob.sync('./backend/app/model/*js').forEach(file => {
  require(path.resolve(file));
});

export default mongoose.connect(DB_CONNECTION.URL, DB_CONNECTION.OPTIONS).catch(err => console.log(err));