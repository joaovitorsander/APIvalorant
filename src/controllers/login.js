const loginService = require('../services/login'); // Importa o serviço de login

// Função assíncrona para autenticar um usuário
const authenticateUser = async (req, res, next) => {
    try {
        // Chama a função de autenticação do serviço de login com os dados do corpo da requisição
        const authResult = await loginService.userAuthentication(req.body);

        // Se a autenticação for bem-sucedida
        if (authResult.success) {
            // Define um cookie com o token JWT
            res.cookie('auth', authResult.token, {
                sameSite: 'none', // Configuração para permitir o uso do cookie em contextos de terceiros
                secure: true, // Garante que o cookie só será enviado em conexões HTTPS
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // Define a expiração do cookie para 7 dias
            });
            // Retorna uma resposta de sucesso com status 200 e mensagem de sucesso
            return res.status(200).json({ message: authResult.message });
        } else {
            // Se a autenticação falhar, retorna uma resposta com status 401 e mensagem de falha
            return res.status(401).json({ message: authResult.message });
        }
    } catch (error) {
        // Se o erro tiver status 404 (usuário não encontrado), retorna uma resposta com status 404 e mensagem de erro
        if (error.status === 404) {
            return res.status(404).json({ message: error.message });
        }
        // Para outros erros, retorna uma resposta com status 500 e mensagem de erro interno do servidor
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports.authenticateUser = authenticateUser; // Exporta a função de autenticação para ser usada em outras partes da aplicação