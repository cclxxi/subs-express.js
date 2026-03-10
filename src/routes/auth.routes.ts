import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { CreateUserSchema } from "../validators/createUser.schema";
import { validate } from "../middleware/validate";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post('/register', validate(CreateUserSchema), authController.registerUser);
router.post('/login', authController.loginUser);

export default router;