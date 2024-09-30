const { Router } = require("express");
const usuariosRoutes = require("./usuarios.routes");
const LoginController = require("../controllers/LoginController");
const locaisRoutes = require("./locais.routes");
const auth = require("../middlewares/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc.swagger.json");

const routes = new Router();

routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use("/usuario", usuariosRoutes);
routes.post("/login", LoginController.acesso);
/*
#swagger.tags = ['Usuário'],
#swagger.description = 'Endpoint para efetuar Log In',
#swagger.parameters['logIn']= {
    in: 'body',
    description: 'Usuário/email e senha',
    required: true,
    schema: {
    $email: 'exemplo@exemplo.com',
    $senha: '123tgr76uy'
    
    }

},
);
*/
// 'logIn'

routes.use("/local", auth, locaisRoutes);

module.exports = routes;
