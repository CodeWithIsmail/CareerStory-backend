/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account with email, username, name, and password. Email verification is required after signup.
 *     operationId: signupUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - name
 *               - password
 *               - confirmPassword
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 pattern: '^[a-z0-9_]+$'
 *                 example: john_doe
 *                 description: Unique username (lowercase alphanumeric and underscore)
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 example: SecurePass123!
 *                 description: Must contain lowercase, uppercase, number, and special character
 *               confirmPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 example: SecurePass123!
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: User created successfully
 *               result:
 *                 userId: 550e8400-e29b-41d4-a716-446655440000
 *                 userName: john_doe
 *                 email: john@example.com
 *                 name: John Doe
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user with username and password. Returns JWT access token.
 *     operationId: loginUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: User logged in successfully
 *               result:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresIn: 3600
 *                 user:
 *                   userId: 550e8400-e29b-41d4-a716-446655440000
 *                   role: USER
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/confirm-email/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Confirm user email
 *     description: Verify user's email address using the token sent via email.
 *     operationId: confirmEmail
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Email verification token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Email confirmed successfully
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/resend-confirm-email/{userName}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Resend confirmation email
 *     description: Resend email verification link to the user. Limited to 1 request per 5 minutes.
 *     operationId: resendConfirmationEmail
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Username
 *         schema:
 *           type: string
 *           minLength: 3
 *     responses:
 *       200:
 *         description: Email resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Confirmation email resent successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/change-password/initiate:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Initiate password change
 *     description: Start the password change process. Sends a 6-digit confirmation code to user's email.
 *     operationId: initiatePasswordChange
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 example: CurrentPass123!
 *                 description: Current password for verification
 *     responses:
 *       200:
 *         description: Password change initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Password change initiated successfully. Please check your email for the confirmation code.
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         description: Rate limit exceeded
 */

/**
 * @swagger
 * /auth/change-password/verify-code:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify password change code
 *     description: Verify the 6-digit confirmation code sent to user's email.
 *     operationId: verifyPasswordChangeCode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *                 example: '123456'
 *                 description: 6-digit confirmation code
 *     responses:
 *       200:
 *         description: Code verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Confirmation code verified successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /auth/change-password/set-new-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Set new password
 *     description: Update password after code verification. New password must be different from current password.
 *     operationId: changePassword
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 example: NewSecurePass123!
 *                 description: New password
 *               confirmPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 example: NewSecurePass123!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Password changed successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
