import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Internal server error
 *
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', userController.getAllUsers);
router.get('/:id', userController.findUserById)

export default router;
