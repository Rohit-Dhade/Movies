import Redis from 'ioredis';

const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})

redis.on("connect" , ()=>{
    console.log("server is connected to redis")
})

redis.on("error" , ()=>{
    console.log("error while connecting to redis")
})

export default redis;