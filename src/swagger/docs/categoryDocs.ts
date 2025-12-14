/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Retrieve a list of all available categories. This endpoint is public and accessible without authentication.
 *     operationId: getAllCategories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                       example: Categories retrieved successfully
 *                     result:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
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
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category (Admin only)
 *     description: Create a new category. Only admin users can create categories.
 *     operationId: createCategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                       example: Category created successfully
 *                     result:
 *                       $ref: '#/components/schemas/Category'
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
 *                   message: Name is required
 *                   code: invalid_type
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
 *       409:
 *         description: Conflict - Category name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 409
 *               message: Category with this name already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Failed to create category
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update a category (Admin only)
 *     description: Update a category's name and/or description. Only admin users can update categories.
 *     operationId: updateCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Category ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                       example: Category updated successfully
 *                     result:
 *                       $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error - Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidUuid:
 *                 summary: Invalid categoryId format
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: categoryId
 *                       message: Invalid uuid
 *                       code: invalid_string
 *               invalidBody:
 *                 summary: Invalid request body
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: name
 *                       message: Name must be at least 1 character
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
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: Failed to update category
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
 *       - Categories
 *     summary: Delete a category (Admin only)
 *     description: Delete a category by ID. Only admin users can delete categories.
 *     operationId: deleteCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Category ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Validation error - Invalid categoryId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: categoryId
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
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: Failed to delete category
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
