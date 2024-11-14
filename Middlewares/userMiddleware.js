export const usertocken = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        console.log("Received token:", token);  // Log the token for debugging

        if (!token) {
            return res.status(403).json({ message: "Token not provided" });
        }

        // Extract token if it's in "Bearer <token>" format
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(400).json({ message: "Malformed token" });
        }

        const jwtToken = tokenParts[1];
        jwt.verify(jwtToken, process.env.USER_JWT, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.email = decode.email;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        next(error);
    }
};
