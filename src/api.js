const express = require('express');
//const { InjectHttpInterceptor } = require('./middleware/in');
const app = express();

const usersRoutes = require('./routes/user_routes');

app.use('/',usersRoutes)

// Resto da configuração do aplicativo...

app.listen(3000)