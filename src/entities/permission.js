class Permission {
    constructor(){
        this.PERMISSION_READ = 2**0
        this.PERMISSION_WRITE = 2**1;
        this.PERMISSION_DELETE = 2**2;
        this.PERMISSION_UPDATE = 2**3;
        this.PERMISSION_EXPORT = 2**4;
        this.PERMISSION_ADMIN = 2**5;
    }

    // Função para verificar se o usuário tem permissão
    hasPermission(userPermissions, requiredPermission) {
       return (userPermissions & requiredPermission) !== 0;
    };
}
