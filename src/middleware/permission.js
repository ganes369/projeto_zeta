// Definindo as permissões
const PERMISSION_READ = 2 ** 0;
const PERMISSION_WRITE = 2 ** 1;
const PERMISSION_DELETE = 2 ** 2;
const PERMISSION_UPDATE = 2 ** 3;
const PERMISSION_EXPORT = 2 ** 4;
const PERMISSION_ADMIN = 2 ** 5;

// Função para verificar se o usuário tem permissão
function hasPermission(userPermissions, requiredPermission) {
    return (userPermissions & requiredPermission) !== 0;
}

// Função para autenticar o usuário e verificar permissões
function permissionAdmin(req, res, next) {
    // Verificando a permissão
    if (!hasPermission(req.payload.permission, PERMISSION_ADMIN))
        return res.status(401).json({ auth: false, message: 'unauthorized' });
    next();
}

function permissionRead(req, res, next) {
    // Verificando a permissão
    if (!hasPermission(req.payload.permission, PERMISSION_READ))
        return res.status(401).json({ auth: false, message: 'unauthorized' });
    next();
}

module.exports = {
    permissionAdmin,
    permissionRead,
};
