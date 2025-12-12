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
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - generateSummary
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 255
 *                 example: My Career Journey in Tech
 *                 description: Story title
 *               body:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 5000
 *                 example: After graduating, I started my career...
 *                 description: Story content
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Array of category IDs
 *                 default: []
 *               generateSummary:
 *                 type: boolean
 *                 example: true
 *                 description: Whether to generate AI summary
 *     responses:
 *       201:
 *         description: Story created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
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
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 255
 *               body:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 5000
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               generateSummary:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Story updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
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
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
