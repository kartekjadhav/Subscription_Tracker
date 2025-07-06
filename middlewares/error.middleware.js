const errorMiddleware = (err, req, res, next) => {
    try {
        let error = err;
        console.log(err.message);

        //Mongoose Validation error
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(e => e.message);
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }

        //Mongoose bad ObjectId
        if(err.name === "CastError"){
            const message = "Resource not found";
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key error
        if(err.code === 11000){
            const message = "Duplicate key error";
            error = new Error(message);
            error.statusCode(409);
        }

        res.status(error.statusCode || 500).json({success: false, message: error.message || "Server Error"});
    } catch (errInErrorHandler) {
        if (!res.headersSent) {
            console.log("Fatal error in error middleware", errInErrorHandler);
            res.status(500).json({success: false, message: "Unexpected server error"});
        }
    }
}

export default errorMiddleware;