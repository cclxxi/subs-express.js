import { Router } from "express";
import * as SubscriptionController from "../controllers/subscription.controller";
import { validate } from "../middleware/validate";
import { CreateSubscriptionSchema } from "../validators/createSubscription.schema";
import { auth } from "../middleware/auth.middleware"

const router = Router();

router.use(auth);

/**
 * @swagger
 * /api/subs:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get current user subscriptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscriptions fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Create a new subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              price:
 *               type: number
 *              periodicity:
 *               type: string[daily, weekly, monthly, yearly, annually, semiannually]
 *              cardId:
 *               type: string
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/subs/upcoming:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get upcoming subscriptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Upcoming subscriptions fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/subs/{id}:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get subscription by id
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
 *         description: Subscription fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Subscriptions
 *     summary: Delete subscription by id
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
 *         description: Subscription deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 *
 * /api/subs/{id}/card:
 *   put:
 *     tags:
 *       - Subscriptions
 *     summary: Update subscription card info
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
 *             properties:
 *               card:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   last4:
 *                     type: number
 *                 required:
 *                   - name
 *                   - last4
 *             required:
 *               - card
 *     responses:
 *       200:
 *         description: Subscription card info updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 *
 * /api/subs/{id}/status:
 *   put:
 *     tags:
 *       - Subscriptions
 *     summary: Update subscription status
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
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription status updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 *
 * /api/subs/{id}/periodicity:
 *   put:
 *     tags:
 *       - Subscriptions
 *     summary: Update subscription periodicity
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
 *             properties:
 *               periodicity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription periodicity updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.get("/", SubscriptionController.getMySubscriptions);
router.get("/upcoming", SubscriptionController.getUpcomingSubscriptions);
router.get("/:id", SubscriptionController.getSubscriptionById);
router.post("/", validate(CreateSubscriptionSchema), SubscriptionController.createSubscription);
router.delete("/:id", SubscriptionController.deleteSubscription);
router.put("/:id/card", SubscriptionController.updateCardInfo);
router.put("/:id/status", SubscriptionController.updateStatus);
router.put("/:id/periodicity", SubscriptionController.updatePeriodicity);

export default router;