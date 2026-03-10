import { Router } from "express";
import * as CardController from "../controllers/card.controller";
import { validate } from "../middleware/validate";
import { CreateCardSchema } from "../validators/createCard.schema";
import { auth } from "../middleware/auth.middleware"

const router = Router();

router.use(auth);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     tags:
 *       - Cards
 *     summary: Get current user cards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cards fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Cards
 *     summary: Create a new card
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/cards/{id}:
 *   put:
 *     tags:
 *       - Cards
 *     summary: Update card by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Card updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Cards
 *     summary: Delete card by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal server error
 */
router.get("/" , CardController.getMyCards);
router.post("/", validate(CreateCardSchema), CardController.createCard);
router.delete("/:id", CardController.deleteCard);
router.put("/:id", CardController.updateCardInfo);

export default router;