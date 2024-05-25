const loginService = require('../services/login');

const authenticateUser = async (req, res, next) => {
    try {
        const authResult = await loginService.userAuthentication(req.body)

        if (authResult.success) {
            return res.status(200).json({ message: authResult.message })
        } else {
            return res.status(401).json({ message: authResult.message })
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' })    
    }
}

module.exports.authenticateUser = authenticateUser