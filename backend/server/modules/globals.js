import {getIp} from './operativeSystem';
import redisConnection from './redis-cluster';

global.systemIp = getIp();
global.redis = redisConnection;
