import Redis from 'ioredis';

export default new Redis.Cluster([
  {port: process.env.REDIS_HOST_1_PORT, host: process.env.REDIS_HOST_1},
  {port: process.env.REDIS_HOST_2_PORT, host: process.env.REDIS_HOST_2},
  {port: process.env.REDIS_HOST_3_PORT, host: process.env.REDIS_HOST_3},
],{
  redisOptions: {
    password: process.env.REDIS_CLUSTER_PASSWORD,
  },
});
