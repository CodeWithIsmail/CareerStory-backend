import { StoryService } from '../../../services/storyService.ts';
import { StoryRepository } from '../../../repositories/storyRepository.ts';
import { UserService } from '../../../services/userService.ts';
import { CategoryService } from '../../../services/categoryService.ts';
import { AIService } from '../../../services/aiService.ts';
import { NotFoundError, DatabaseError } from '../../../errors/CustomErrors.ts';
import { ERROR_MESSAGES } from '../../../constants/errorMessages.ts';
import {
  createMockStory,
  createMockStoryWithCategories,
  createMockCategory,
  createMockUserProfile,
  createMockPaginatedResponse,
  createCreateStoryDto,
  createUpdateStoryDto,
  createMockStoryPaginationQuery,
  MOCK_USER_ID,
  MOCK_STORY_ID,
  MOCK_STORY_ID_2,
  MOCK_CATEGORY_ID_1,
  MOCK_CATEGORY_ID_2,
} from '../../fixtures/index.ts';
import { createMockDeleteResult } from '../../helpers/testHelpers.ts';

// Mock dependencies
jest.mock('../../../repositories/storyRepository.ts');
jest.mock('../../../services/userService.ts');
jest.mock('../../../services/categoryService.ts');
jest.mock('../../../services/aiService.ts');

describe('StoryService', () => {
  let storyService: StoryService;
  let mockStoryRepository: jest.Mocked<StoryRepository>;
  let mockUserService: jest.Mocked<UserService>;
  let mockCategoryService: jest.Mocked<CategoryService>;
  let mockAIService: jest.Mocked<AIService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStoryRepository = new StoryRepository() as jest.Mocked<StoryRepository>;
    mockUserService = new UserService() as jest.Mocked<UserService>;
    mockCategoryService = new CategoryService() as jest.Mocked<CategoryService>;
    mockAIService = new AIService() as jest.Mocked<AIService>;

    storyService = new StoryService();
    (storyService as any).storyRepository = mockStoryRepository;
    (storyService as any).userService = mockUserService;
    (storyService as any).categoryService = mockCategoryService;
    (storyService as any).aiService = mockAIService;
  });

  describe('createStory', () => {
    it('should create story without categories successfully', async () => {
      const createStoryDto = createCreateStoryDto();
      const mockStory = createMockStory({
        title: createStoryDto.title,
        body: createStoryDto.body,
      });

      mockStoryRepository.createStory = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.createStory(createStoryDto);

      expect(result.title).toBe(createStoryDto.title);
      expect(result.body).toBe(createStoryDto.body);
      expect(mockStoryRepository.createStory).toHaveBeenCalled();
    });

    it('should create story with categories successfully', async () => {
      const categories = [
        createMockCategory({ categoryId: MOCK_CATEGORY_ID_1 }),
        createMockCategory({ categoryId: MOCK_CATEGORY_ID_2 }),
      ];
      const createStoryDto = createCreateStoryDto({
        categoryIds: [MOCK_CATEGORY_ID_1, MOCK_CATEGORY_ID_2],
      });
      const mockStory = createMockStoryWithCategories();

      mockCategoryService.getCategoriesByIds = jest.fn().mockResolvedValue(categories);
      mockStoryRepository.createStory = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.createStory(createStoryDto);

      expect(result.title).toBe(mockStory.title);
      expect(mockCategoryService.getCategoriesByIds).toHaveBeenCalledWith([
        MOCK_CATEGORY_ID_1,
        MOCK_CATEGORY_ID_2,
      ]);
    });

    it('should generate AI summary when requested', async () => {
      const createStoryDto = createCreateStoryDto({ generateSummary: true });
      const mockStory = createMockStory({ summary: 'AI generated summary' });

      mockAIService.generateStorySummary = jest.fn().mockResolvedValue('AI generated summary');
      mockStoryRepository.createStory = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.createStory(createStoryDto);

      expect(mockAIService.generateStorySummary).toHaveBeenCalledWith(
        createStoryDto.title,
        createStoryDto.body,
      );
      expect(result.summary).toBe('AI generated summary');
    });

    it('should not generate AI summary when not requested', async () => {
      const createStoryDto = createCreateStoryDto({ generateSummary: false });
      const mockStory = createMockStory({ summary: null });

      mockStoryRepository.createStory = jest.fn().mockResolvedValue(mockStory);

      await storyService.createStory(createStoryDto);

      expect(mockAIService.generateStorySummary).not.toHaveBeenCalled();
    });

    it('should throw DatabaseError when story creation fails', async () => {
      const createStoryDto = createCreateStoryDto();

      mockStoryRepository.createStory = jest.fn().mockResolvedValue(null);

      await expect(storyService.createStory(createStoryDto)).rejects.toThrow(DatabaseError);
    });

    it('should throw NotFoundError for invalid category IDs', async () => {
      const createStoryDto = createCreateStoryDto({
        categoryIds: [MOCK_CATEGORY_ID_1, '550e8400-e29b-41d4-a716-446655440099'],
      });

      mockCategoryService.getCategoriesByIds = jest
        .fn()
        .mockResolvedValue([createMockCategory({ categoryId: MOCK_CATEGORY_ID_1 })]);

      await expect(storyService.createStory(createStoryDto)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getStories', () => {
    it('should return paginated stories without filters', async () => {
      const paginationParams = createMockStoryPaginationQuery();
      const mockStories = [createMockStory(), createMockStory({ storyId: MOCK_STORY_ID_2 })];
      const mockPaginatedResponse = createMockPaginatedResponse(mockStories);

      mockStoryRepository.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      const result = await storyService.getStories(paginationParams as any);

      expect(result.data).toHaveLength(2);
      expect(mockStoryRepository.getStories).toHaveBeenCalled();
    });

    it('should return user-specific stories when userId provided', async () => {
      const paginationParams = createMockStoryPaginationQuery();
      const mockStories = [createMockStory()];
      const mockPaginatedResponse = createMockPaginatedResponse(mockStories);
      const mockUser = createMockUserProfile();

      mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);
      mockStoryRepository.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      const result = await storyService.getStories(paginationParams as any, MOCK_USER_ID);

      expect(result.data).toHaveLength(1);
      expect(mockUserService.getUserById).toHaveBeenCalledWith(MOCK_USER_ID);
    });

    it('should return empty list when no stories exist', async () => {
      const paginationParams = createMockStoryPaginationQuery();
      const mockPaginatedResponse = createMockPaginatedResponse([]);

      mockStoryRepository.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      const result = await storyService.getStories(paginationParams as any);

      expect(result.data).toHaveLength(0);
    });
  });

  describe('getStoryById', () => {
    it('should return story when found', async () => {
      const mockStory = createMockStory();
      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.getStoryById(MOCK_STORY_ID);

      expect(result.storyId).toBe(MOCK_STORY_ID);
      expect(result.title).toBe('Test Story Title');
      expect(mockStoryRepository.getStoryById).toHaveBeenCalledWith(MOCK_STORY_ID);
    });

    it('should throw NotFoundError when story not found', async () => {
      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(null);

      await expect(storyService.getStoryById('invalid-id')).rejects.toThrow(NotFoundError);
      await expect(storyService.getStoryById('invalid-id')).rejects.toThrow(ERROR_MESSAGES.STORY.NOT_FOUND);
    });
  });

  describe('updateStory', () => {
    it('should update story successfully without categories', async () => {
      const updateData = createUpdateStoryDto();
      const mockExistingStory = createMockStory();
      const mockUpdatedStory = createMockStory({
        title: 'Updated Story Title',
        body: 'Updated story body.',
      });

      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockExistingStory);
      mockStoryRepository.updateStory = jest.fn().mockResolvedValue(mockUpdatedStory);

      const result = await storyService.updateStory(MOCK_STORY_ID, updateData);

      expect(result.title).toBe('Updated Story Title');
      expect(mockStoryRepository.updateStory).toHaveBeenCalled();
    });

    it('should update story with new categories', async () => {
      const categories = [createMockCategory({ categoryId: MOCK_CATEGORY_ID_1 })];
      const updateData = createUpdateStoryDto({ categoryIds: [MOCK_CATEGORY_ID_1] });
      const mockExistingStory = createMockStory();
      const mockUpdatedStory = createMockStoryWithCategories();

      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockExistingStory);
      mockCategoryService.getCategoriesByIds = jest.fn().mockResolvedValue(categories);
      mockStoryRepository.updateStory = jest.fn().mockResolvedValue(mockUpdatedStory);

      const result = await storyService.updateStory(MOCK_STORY_ID, updateData);

      expect(mockCategoryService.getCategoriesByIds).toHaveBeenCalledWith([MOCK_CATEGORY_ID_1]);
      expect(result).toBeDefined();
    });

    it('should generate new AI summary when requested', async () => {
      const updateData = createUpdateStoryDto({ generateSummary: true });
      const mockExistingStory = createMockStory();
      const mockUpdatedStory = createMockStory({ summary: 'New AI summary' });

      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockExistingStory);
      mockAIService.generateStorySummary = jest.fn().mockResolvedValue('New AI summary');
      mockStoryRepository.updateStory = jest.fn().mockResolvedValue(mockUpdatedStory);

      const result = await storyService.updateStory(MOCK_STORY_ID, updateData);

      expect(mockAIService.generateStorySummary).toHaveBeenCalled();
      expect(result.summary).toBe('New AI summary');
    });

    it('should throw NotFoundError when story not found for update', async () => {
      const updateData = createUpdateStoryDto();
      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(null);

      await expect(storyService.updateStory('invalid-id', updateData)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when updated story not found', async () => {
      const updateData = createUpdateStoryDto();
      const mockExistingStory = createMockStory();

      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockExistingStory);
      mockStoryRepository.updateStory = jest.fn().mockResolvedValue(null);

      await expect(storyService.updateStory(MOCK_STORY_ID, updateData)).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteStory', () => {
    it('should delete story successfully', async () => {
      mockStoryRepository.deleteStory = jest.fn().mockResolvedValue(createMockDeleteResult(1));

      await expect(storyService.deleteStory(MOCK_STORY_ID)).resolves.toBeUndefined();
      expect(mockStoryRepository.deleteStory).toHaveBeenCalledWith(MOCK_STORY_ID);
    });

    it('should throw NotFoundError when deleting non-existent story', async () => {
      mockStoryRepository.deleteStory = jest.fn().mockResolvedValue(createMockDeleteResult(0));

      await expect(storyService.deleteStory('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('storyAuthorUserId', () => {
    it('should return author userId', async () => {
      const mockStory = createMockStory();
      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.storyAuthorUserId(MOCK_STORY_ID);

      expect(result).toBe(MOCK_USER_ID);
    });

    it('should return null when story has no user', async () => {
      const mockStory = createMockStory();
      mockStory.user = undefined as any;
      mockStoryRepository.getStoryById = jest.fn().mockResolvedValue(mockStory);

      const result = await storyService.storyAuthorUserId(MOCK_STORY_ID);

      expect(result).toBeUndefined();
    });
  });

  describe('validateAndFetchCategories', () => {
    it('should return categories when all IDs are valid', async () => {
      const categories = [
        createMockCategory({ categoryId: MOCK_CATEGORY_ID_1 }),
        createMockCategory({ categoryId: MOCK_CATEGORY_ID_2 }),
      ];
      mockCategoryService.getCategoriesByIds = jest.fn().mockResolvedValue(categories);

      const result = await storyService.validateAndFetchCategories(
        [MOCK_CATEGORY_ID_1, MOCK_CATEGORY_ID_2],
        'test-context',
      );

      expect(result).toHaveLength(2);
      expect(mockCategoryService.getCategoriesByIds).toHaveBeenCalledWith([
        MOCK_CATEGORY_ID_1,
        MOCK_CATEGORY_ID_2,
      ]);
    });

    it('should throw NotFoundError for invalid category IDs', async () => {
      const categories = [createMockCategory({ categoryId: MOCK_CATEGORY_ID_1 })];
      mockCategoryService.getCategoriesByIds = jest.fn().mockResolvedValue(categories);

      await expect(
        storyService.validateAndFetchCategories(
          [MOCK_CATEGORY_ID_1, '550e8400-e29b-41d4-a716-446655440099'],
          'test-context',
        ),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
