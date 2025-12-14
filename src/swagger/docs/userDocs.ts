/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users with pagination
 *     description: Retrieve a paginated list of all users with optional search and sorting.
 *     operationId: getAllUsers
 *     parameters:
 *       - name: find
 *         in: query
 *         description: Search term to filter users by username, email, or name
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *       - name: itemsPerPage
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *       - name: sortDirection
 *         in: query
 *         description: Sort direction
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *       - name: orderBy
 *         in: query
 *         description: Field to sort by
 *         schema:
 *           type: string
 *           enum: [userId, userName, name, email, joinDate]
 *           default: userName
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                       example: Users retrieved successfully
 *                     result:
 *                       type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/User'
 *                         pagination:
 *                           $ref: '#/components/schemas/PaginationMetadata'
 *       400:
 *         description: Validation error - Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: page
 *                   message: Page must be a positive number
 *                   code: too_small
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
 * /users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user profile
 *     description: Retrieve the authenticated user's profile information.
 *     operationId: getCurrentUserProfile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                       example: User profile retrieved successfully
 *                     result:
 *                       $ref: '#/components/schemas/User'
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
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information. At least one field must be provided.
 *     operationId: updateUserProfile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfileRequest'
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 *                       example: User updated successfully
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
 *                 - field: name
 *                   message: Name must be at least 3 characters
 *                   code: too_small
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
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieve a specific user's profile by their user ID.
 *     operationId: getUserById
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User retrieved successfully
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
 *                       example: User retrieved successfully
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error - Invalid userId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: userId
 *                   message: Invalid uuid
 *                   code: invalid_string
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
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user account
 *     description: Delete a user account. Requires authentication and authorization (user can delete their own account or admin can delete any account).
 *     operationId: deleteUser
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Validation error - Invalid userId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: userId
 *                   message: Invalid uuid
 *                   code: invalid_string
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
 *       403:
 *         description: Forbidden - Cannot delete other user's account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
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
 * /users/change-role/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user role (Admin only)
 *     description: Change a user's role. This operation requires ADMIN privileges.
 *     operationId: updateUserRole
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRoleRequest'
 *     responses:
 *       200:
 *         description: User role updated successfully
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
 *                       example: User role updated successfully
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error - Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidUuid:
 *                 summary: Invalid userId format
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: userId
 *                       message: Invalid uuid
 *                       code: invalid_string
 *               invalidRole:
 *                 summary: Invalid role value
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: role
 *                       message: "Invalid enum value. Expected 'USER' | 'ADMIN'"
 *                       code: invalid_enum_value
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
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
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
