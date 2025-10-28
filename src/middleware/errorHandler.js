

export const errorHandler = (err, req, res, next) => {
    // console.log("Ress>>>>",res);
    console.log("statuss>>>>",res?.statusCode);
    console.log("err>>>>",res.message);
    
    const status = res?.statusCode || 500;
    console.log("statuss222>>>>",status);

    switch (status) {
        case 400:
            res.status(400).json({
                title: "Validation Failed",
                message: err?.message,
                stackTrace: err?.stack
            });
            break;
        case 404:
            res.status(404).json({
                title: "Not Found",
                message: err?.message,
                stackTrace: err?.stack
            });
            break;
        case 401:
            res.status(401).json({
                title: "Unauthorized",
                message: err?.message,
                stackTrace: err?.stack
            });
            break;
        case 403:
            res.status(403).json({
                title: "Forbidden",
                message: err?.message,
                stackTrace: err?.stack
            });
            break;
        case 500:
            res.status(500).json({
                title: "Server Error",
                message: err?.message,
                stackTrace: err?.stack
            });
            break;
        default:
            console.log("No error found!!");
            break;
    }
}