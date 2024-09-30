const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const DashboardController = require('../controllers/DashboardController');

// Middleware de autenticação e autorização
router.use(authMiddleware.verifyToken);

// Rotas
router.get('/overview', DashboardController.getOverview);
router.get('/users', authMiddleware.isAdmin, DashboardController.getUsersStatistics);
router.get('/activity', DashboardController.getActivityLogs);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Rotas de dashboard para obtenção de estatísticas e logs de atividade
 */

/**
 * @swagger
 * /dashboard/overview:
 *   get:
 *     summary: Obtém a visão geral dos dados do dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Visão geral dos dados do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 120
 *                 totalCreators:
 *                   type: integer
 *                   example: 10
 *                 totalStudents:
 *                   type: integer
 *                   example: 110
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro ao obter a visão geral do dashboard
 */
router.get('/overview', authMiddleware.verifyToken, DashboardController.getOverview);

/**
 * @swagger
 * /dashboard/users:
 *   get:
 *     summary: Obtém estatísticas de usuários (apenas para administradores)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 120
 *                 activeUsers:
 *                   type: integer
 *                   example: 100
 *       403:
 *         description: Permissão insuficiente
 *       500:
 *         description: Erro ao obter estatísticas de usuários
 */
router.get('/users', authMiddleware.verifyToken, authMiddleware.isAdmin, DashboardController.getUsersStatistics);

/**
 * @swagger
 * /dashboard/activity:
 *   get:
 *     summary: Obtém os logs de atividade do sistema
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logs de atividade do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                     example: "john_doe"
 *                   action:
 *                     type: string
 *                     example: "Login"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-30T12:34:56Z"
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro ao obter os logs de atividade
 */
router.get('/activity', authMiddleware.verifyToken, DashboardController.getActivityLogs);

module.exports = router;