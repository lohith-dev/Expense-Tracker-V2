let jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // console.debug("authorization --> " + req.headers["authorization"]);
    console.log("jhkhkjhkjhkjh",req.headers["authorization"]);
    if (req.headers["authorization"]) {
        // const token = req.headers["authorization"].split(" ")[1];
        const token = req.headers['authorization'];

        console.log("sddddddddddddddddddddddddddd",token);

        const payload = jwt.verify(token, "thisissecreateKey")
        console.log("jjjjjjjjjjj",payload);

        const decode = jwt.decode(token);
        req.user=decode;
        next();
    } else {
        res.status(401).json({
            error: true,
            message: "Not Authorized",
            data: null
        })
    }
}


module.exports = {
    authenticate
}