exports.isAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(404).json({error: "User Not Found"});
    }
    next();
};