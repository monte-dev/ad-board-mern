const authMiddleware = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		console.log('auth middleware, not authorized || no userId');
		res.status(401).send({ message: 'You are not authorized' });
	}
};

module.exports = authMiddleware;
