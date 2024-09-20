const { verify } = require("jsonwebtoken");

function auth(request, response, next){
    try {
        const token = request.headers.authorization;
        console.log(token);
        if (!token) {
          return response.status(400).json({ mensagem: "Token não anexado" });
        }
    
        const tokenArray = token.split(" ");
    
        const resultado = verify(tokenArray[1], process.env.JWT_SECRET);
    
        request.usuarioId = resultado.id;
        console.log(request.usuarioId);
    
        next();
      } catch (error) {
        if (error.message === "JWT malformed" || error.message === "JWT expired") {
          response.status(400).json({ mensagem: "Token inválido ou expirado!" });
        } else {
          console.log(error)
          response.status(500).json({ mensagem: "A requisição falhou" });
        }
      }
}

module.exports = auth