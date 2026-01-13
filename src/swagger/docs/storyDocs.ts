/**
 * @swagger
 * /stories:
 *   post:
 *     tags:
 *       - Stories
 *     summary: Create a new story
 *     description: Create a new story with title, body, and optional categories. Can optionally generate AI summary.
 *     operationId: createStory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStoryRequest'
 *     responses:
 *       201:
 *         description: Story created successfully
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
 *                       example: Story created successfully
 *                     result:
 *                       $ref: '#/components/schemas/Story'
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
 *                 - field: title
 *                   message: Title must be at least 5 characters
 *                   code: too_small
 *                 - field: body
 *                   message: Body must be at least 10 characters
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
 *         description: Category not found - Invalid category IDs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: "Category not found: Invalid category IDs - 550e8400-e29b-41d4-a716-446655440000"
 *       500:
 *         description: Internal server error - Database or AI service failure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               databaseError:
 *                 summary: Database error
 *                 value:
 *                   success: false
 *                   statusCode: 500
 *                   message: Internal server error
 *               aiError:
 *                 summary: AI summary generation failed
 *                 value:
 *                   success: false
 *                   statusCode: 500
 *                   message: Failed to generate story summary
 *   get:
 *     tags:
 *       - Stories
 *     summary: Get all stories with filtering and pagination
 *     description: Retrieve a paginated list of all stories with optional filtering by categories, search, and sorting.
 *     operationId: getAllStories
 *     parameters:
 *       - name: find
 *         in: query
 *         description: Search term to filter stories by title, body, author username or email
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         description: Category filter - can be multiple values to filter by one or more categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
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
 *           enum: [storyId, userId, title, body, createdAt, updatedAt]
 *           default: userId
 *     responses:
 *       200:
 *         description: Stories retrieved successfully
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
 *                       example: Stories retrieved successfully
 *                     result:
 *                       type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Story'
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
 * /stories/{storyId}:
 *   get:
 *     tags:
 *       - Stories
 *     summary: Get story by ID
 *     description: Retrieve a specific story by its ID. Story is publicly accessible.
 *     operationId: getStoryById
 *     parameters:
 *       - name: storyId
 *         in: path
 *         required: true
 *         description: Story ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Story retrieved successfully
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
 *                       example: Story retrieved successfully
 *                     result:
 *                       $ref: '#/components/schemas/Story'
 *       400:
 *         description: Validation error - Invalid storyId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: storyId
 *                   message: Invalid uuid
 *                   code: invalid_string
 *       404:
 *         description: Story not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: Story not found
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
 *       - Stories
 *     summary: Update story
 *     description: Update an existing story. Only the story author or admin can update. At least one field must be provided.
 *     operationId: updateStory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: storyId
 *         in: path
 *         required: true
 *         description: Story ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStoryRequest'
 *     responses:
 *       200:
 *         description: Story updated successfully
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
 *                       example: Story updated successfully
 *                     result:
 *                       $ref: '#/components/schemas/Story'
 *       400:
 *         description: Validation error - Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidUuid:
 *                 summary: Invalid storyId format
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: storyId
 *                       message: Invalid uuid
 *                       code: invalid_string
 *               invalidBody:
 *                 summary: Invalid request body
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: Validation failed
 *                   details:
 *                     - field: title
 *                       message: Title must be at least 5 characters
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
 *         description: Forbidden - Not story owner or admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
 *       404:
 *         description: Story or category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               storyNotFound:
 *                 summary: Story not found
 *                 value:
 *                   success: false
 *                   statusCode: 404
 *                   message: Story not found
 *               categoryNotFound:
 *                 summary: Invalid category IDs
 *                 value:
 *                   success: false
 *                   statusCode: 404
 *                   message: "Category not found: Invalid category IDs - 550e8400-e29b-41d4-a716-446655440000"
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
 *       - Stories
 *     summary: Delete story
 *     description: Delete a story. Only the story author or admin can delete.
 *     operationId: deleteStory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: storyId
 *         in: path
 *         required: true
 *         description: Story ID (UUID format)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Story deleted successfully
 *       400:
 *         description: Validation error - Invalid storyId format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation failed
 *               details:
 *                 - field: storyId
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
 *         description: Forbidden - Not story owner or admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
 *       404:
 *         description: Story not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: Story not found
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
