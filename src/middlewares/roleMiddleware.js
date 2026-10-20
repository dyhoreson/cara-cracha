// Esta função recebe quais cargos podem acessar a rota (Ex: 'gerente', 'admin')
const autorizarCargos = (...cargosPermitidos) => {
    
    // Ela retorna um middleware configurado
    return (req, res, next) => {
        // Pega o cargo que foi descoberto pelo middleware de autenticação (authMiddleware)
        const cargoUsuario = req.usuario_cargo;

        // Se o cargo do usuário NÃO estiver na lista de permitidos, bloqueia!
        if (!cargosPermitidos.includes(cargoUsuario)) {
            return res.status(403).json({ 
                mensagem: 'Acesso negado (403 Forbidden). Apenas usuários com o perfil [' + cargosPermitidos.join(', ') + '] têm acesso a este recurso.' 
            });
        }

        // Se o cargo estiver correto, libera a passagem para o Controller!
        next();
    };
};

module.exports = autorizarCargos;