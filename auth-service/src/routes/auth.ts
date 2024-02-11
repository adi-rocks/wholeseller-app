import { Router } from 'express'
import { AuthController } from '../controller/AuthController'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const authController = new AuthController()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
router.post('/login', authMiddleware, (req, res, next) => {
  authController.login(req, res, next)
})

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout from the application
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 */
router.get('/logout', authMiddleware, (req, res, next) => {
  authController.logout(req, res, next)
})

export function setAuthRoutes (app: any): void {
  app.use('/auth', router)
}
