const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKeyPath = path.join(__dirname, '../private/public_key.pem');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;
