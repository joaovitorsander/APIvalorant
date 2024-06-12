const loginService = require('../services/login');

const authenticateUser = async (req, res, next) => {
    try {
        const authResult = await loginService.userAuthentication(req.body);

        if (authResult.success) {
            res.cookie('auth', authResult.token, {
                sameSite: 'none',
                secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            });
            return res.status(200).json({ message: authResult.message });
        } else {
            return res.status(401).json({ message: authResult.message });
        }
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports.authenticateUser = authenticateUser;
