import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 tokens from the bucket
        
        if(decision.isDenied()){
            //Ratelimit
            if(decision.reason.isRateLimit()) res.status(429).json({success: false, error: "Too many requests"});

            //Bot
            else if(decision.reason.isBot()) res.status(403).json({success: false, error: "Not bots allowed"});

            else res.status(401).json({success: false, error: "Forbidden"});
        } else {
            next();
        }

    } catch (error) {
        console.log("Error in Arcjet middleware", error);
        next(error);
    }
}

export default arcjetMiddleware;