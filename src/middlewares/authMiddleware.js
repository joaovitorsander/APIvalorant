const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken para trabalhar com JWTs
const fs = require('fs'); // Importa o módulo fs para ler arquivos do sistema de arquivos
const path = require('path'); // Importa o módulo path para trabalhar com caminhos de arquivos

// Define o caminho para a chave pública
const publicKeyPath = path.join(__dirname, '../private/public_key.pem');
// Lê a chave pública do arquivo
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    // Obtém o token do cookie de autenticação
    const token = req.cookies.auth;

    // Se não houver token, retorna um erro 401 (não autorizado)
    if (!token) {
        return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
        // Verifica e decodifica o token JWT usando a chave pública e o algoritmo RS256
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        // Adiciona as informações do usuário decodificado ao objeto de requisição
        req.user = decoded.user;
        // Chama a próxima função na cadeia de middleware
        next();
    } catch (error) {
        // Se a verificação do token falhar, retorna um erro 401 (não autorizado)
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

// Exporta o middleware de autenticação para ser usado em outras partes da aplicação
module.exports = authMiddleware;
