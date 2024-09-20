const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const connection = require('./database/connection')

require('./models/Associations');


const APP_PORT = process.env.APP_PORT

class Server {
  constructor(server = express()) { 
    this.middlewares(server);
    this.database();
    server.use(routes); 
    this.initializeServer(server);
  }

  
  async middlewares(server) {
    server.use(cors()); 
    server.use(express.json());
  }

  /* Request --> (Rota --> |middlewares| --> Controller --> resposta) --> Response*/

  async database() {
   try {
    console.log("conectando ao banco de dados");
    await connection.authenticate()
   } catch (error) {
    console.log('erro ao conectar ao banco de dados', error)
   }
  
  }

  async initializeServer(server) {
    server.listen(APP_PORT, () => {
      console.log("Servidor rodando na porta 3000");
    });
  }
}

module.exports = { Server };

