import rateLimit from "../config/upstash.js"


const rateLimiter = async (req, resizeBy, next) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key");

        if(!success) {
            return resizeBy.status(429).json({
                message: "Too many requests, please try again later",
            })
        }
        next();
    } catch (error) {
        console.log("Rate Limit error", error)
        next(error);
    }
}



export default rateLimiter