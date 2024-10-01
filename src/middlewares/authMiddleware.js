const jwt = require('jsonwebtoken');

// Middleware de autenticação
const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token não fornecido.' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Armazena as informações do usuário no req.user
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permissão insuficiente.' });
    }
    next();
  }
};

module.exports = authMiddleware;
