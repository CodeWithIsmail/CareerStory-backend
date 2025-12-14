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
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 201
 *                     message:
 *                       type: string
 *                       example: User created successfully
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error - Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: email
 *                   message: Invalid email format
 *                   code: invalid_string
 *                 - field: password
 *                   message: Password must be at least 8 characters
 *                   code: too_small
 *       409:
 *         description: Conflict - Email or username already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               duplicateEmail:
 *                 summary: Email already exists
 *                 value:
 *                   success: false
 *                   statusCode: 409
 *                   message: Email already exists
 *               duplicateUsername:
 *                 summary: Username already exists
 *                 value:
 *                   success: false
 *                   statusCode: 409
 *                   message: Username already exists
 *               duplicateBoth:
 *                 summary: Both email and username exist
 *                 value:
 *                   success: false
 *                   statusCode: 409
 *                   message: Email and Username already exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user with username and password. Returns JWT access token. User must have verified email.
 *     operationId: loginUser
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
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: User logged in successfully
 *                     result:
 *                       $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error - Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: userName
 *                   message: Username is required
 *                   code: invalid_type
 *       401:
 *         description: Unauthorized - Invalid credentials or email not verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               incorrectPassword:
 *                 summary: Incorrect password
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Incorrect password
 *               emailNotVerified:
 *                 summary: Email not verified
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Email address not verified
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal server error
 */

/**
 * @swagger
 * /auth/confirm-email/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Confirm user email
 *     description: Verify user's email address using the JWT token sent via email.
 *     operationId: confirmEmail
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Email verification JWT token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: Email confirmed successfully
 *       400:
 *         description: Validation error - Invalid token format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: token
 *                   message: Token is required
 *                   code: invalid_type
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidToken:
 *                 summary: Invalid token
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Invalid authentication token
 *               expiredToken:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Authentication token has expired
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal server error
 */

/**
 * @swagger
 * /auth/resend-confirm-email/{userName}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Resend confirmation email
 *     description: Resend email verification link to the user. Rate limited to 1 request per 5 minutes per user.
 *     operationId: resendConfirmationEmail
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Username of the account
 *         schema:
 *           type: string
 *           minLength: 3
 *     responses:
 *       200:
 *         description: Email resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: Confirmation email resent successfully
 *       400:
 *         description: Email already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Email address is already verified
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: User not found
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 429
 *               message: "Rate limit exceeded: Only 1 resend attempt allowed every 5 minutes. Please try again later."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal server error
 */

/**
 * @swagger
 * /auth/change-password/initiate:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Initiate password change
 *     description: Start the password change process. Sends a 6-digit confirmation code to user's email. Rate limited to 3 requests per hour.
 *     operationId: initiatePasswordChange
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInitiationRequest'
 *     responses:
 *       200:
 *         description: Password change initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: Password change initiated successfully. Please check your email for the confirmation code.
 *       400:
 *         description: Validation error - Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: currentPassword
 *                   message: Current password is required
 *                   code: invalid_type
 *       401:
 *         description: Unauthorized - Missing token or incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noToken:
 *                 summary: No token provided
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: No authentication token provided
 *               invalidToken:
 *                 summary: Invalid token
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Invalid authentication token
 *               incorrectPassword:
 *                 summary: Incorrect current password
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Incorrect password
 *       429:
 *         description: Rate limit exceeded (3 requests per hour)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 429
 *               message: Too many requests, please try again later.
 *       500:
 *         description: Internal server error - Failed to initiate password change
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Failed to update password
 */

/**
 * @swagger
 * /auth/change-password/verify-code:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify password change code
 *     description: Verify the 6-digit confirmation code sent to user's email. Rate limited to 5 attempts per 10 minutes.
 *     operationId: verifyPasswordChangeCode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyPasswordChangeCodeRequest'
 *     responses:
 *       200:
 *         description: Code verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: Confirmation code verified successfully
 *       400:
 *         description: Invalid code, expired code, or code not requested
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               codeNotRequested:
 *                 summary: No password change requested
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: No password change requested
 *               codeExpired:
 *                 summary: Code expired
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Confirmation code has expired. Please initiate password change again.
 *               codeInvalid:
 *                 summary: Invalid code
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Invalid or incorrect confirmation code
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noToken:
 *                 summary: No token provided
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: No authentication token provided
 *               invalidToken:
 *                 summary: Invalid token
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Invalid authentication token
 *       429:
 *         description: Rate limit exceeded (5 attempts per 10 minutes)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 429
 *               message: Too many requests, please try again later.
 *       500:
 *         description: Internal server error - Failed to verify code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Failed to update password
 */

/**
 * @swagger
 * /auth/change-password/set-new-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Set new password
 *     description: Update password after code verification. Code must be verified first. Rate limited to 3 attempts per hour.
 *     operationId: changePassword
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetNewPasswordRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: Password changed successfully
 *       400:
 *         description: Code not verified or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               codeNotVerified:
 *                 summary: Code not verified
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Please verify the confirmation code first
 *               codeExpired:
 *                 summary: Code expired
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Confirmation code has expired. Please initiate password change again.
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: password
 *                       message: Password must be at least 8 characters
 *                       code: too_small
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noToken:
 *                 summary: No token provided
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: No authentication token provided
 *               invalidToken:
 *                 summary: Invalid token
 *                 value:
 *                   success: false
 *                   statusCode: 401
 *                   message: Invalid authentication token
 *       429:
 *         description: Rate limit exceeded (3 attempts per hour)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 429
 *               message: Too many requests, please try again later.
 *       500:
 *         description: Internal server error - Failed to update password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Failed to update password
 */
