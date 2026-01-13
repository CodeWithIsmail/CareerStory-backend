import { StoryController } from '../../../controllers/storyController.ts';
import { StoryService } from '../../../services/storyService.ts';
import { createMockRequest, createMockResponse } from '../../helpers/testHelpers.ts';
import {
  createMockStory,
  createMockPaginatedResponse,
  createCreateStoryDto,
  createUpdateStoryDto,
} from '../../fixtures/index.ts';
import { Response } from 'express';
import { AuthRequest } from '../../../middlewares/authenticationMiddleware.ts';

// Mock dependencies
jest.mock('../../../services/storyService.ts');

describe('StoryController', () => {
  let storyController: StoryController;
  let mockStoryService: jest.Mocked<StoryService>;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStoryService = new StoryService() as jest.Mocked<StoryService>;
    storyController = new StoryController();
    (storyController as any).storyService = mockStoryService;

    mockRequest = createMockRequest();
    mockResponse = createMockResponse();
  });

  describe('createStory', () => {
    it('should create story and return 201 status', async () => {
      const createStoryDto = createCreateStoryDto();
      const mockStory = createMockStory({
        title: createStoryDto.title,
        body: createStoryDto.body,
      });

      mockRequest.body = createStoryDto;
      mockRequest.userId = 'user-uuid-123';
      mockStoryService.createStory = jest.fn().mockResolvedValue(mockStory);

      await storyController.createStory(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          statusCode: 201,
        }),
      );
      expect(mockStoryService.createStory).toHaveBeenCalledWith({
        ...createStoryDto,
        userId: 'user-uuid-123',
      });
    });

    it('should propagate error when creation fails', async () => {
      mockRequest.body = createCreateStoryDto();
      mockRequest.userId = 'user-uuid-123';
      mockStoryService.createStory = jest.fn().mockRejectedValue(new Error('Creation failed'));

      await expect(
        storyController.createStory(mockRequest as AuthRequest, mockResponse as Response),
      ).rejects.toThrow('Creation failed');
    });
  });

  describe('getAllStories', () => {
    it('should return paginated stories with 200 status', async () => {
      const mockStories = [createMockStory(), createMockStory({ storyId: 'story-2' })];
      const mockPaginatedResponse = createMockPaginatedResponse(mockStories);

      mockRequest.userId = 'user-uuid-123';
      mockStoryService.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      await storyController.getAllStories(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          statusCode: 200,
        }),
      );
      expect(mockStoryService.getStories).toHaveBeenCalledWith(mockRequest.validatedQuery, 'user-uuid-123');
    });

    it('should return empty list when no stories exist', async () => {
      const mockPaginatedResponse = createMockPaginatedResponse([]);

      mockRequest.userId = 'user-uuid-123';
      mockStoryService.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      await storyController.getAllStories(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getStoriesByUser', () => {
    it('should return stories for specific user with 200 status', async () => {
      const mockStories = [createMockStory()];
      const mockPaginatedResponse = createMockPaginatedResponse(mockStories);

      mockRequest.params = { userId: 'target-user-uuid' };
      mockStoryService.getStories = jest.fn().mockResolvedValue(mockPaginatedResponse);

      await storyController.getStoriesByUser(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockStoryService.getStories).toHaveBeenCalledWith(
        mockRequest.validatedQuery,
        'target-user-uuid',
      );
    });
  });

  describe('getStoryById', () => {
    it('should return story with 200 status when found', async () => {
      const mockStory = createMockStory();
      mockRequest.params = { storyId: 'story-uuid-123' };

      mockStoryService.getStoryById = jest.fn().mockResolvedValue(mockStory);

      await storyController.getStoryById(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          result: mockStory,
        }),
      );
      expect(mockStoryService.getStoryById).toHaveBeenCalledWith('story-uuid-123');
    });

    it('should propagate error when story not found', async () => {
      mockRequest.params = { storyId: 'invalid-id' };
      mockStoryService.getStoryById = jest.fn().mockRejectedValue(new Error('Story not found'));

      await expect(
        storyController.getStoryById(mockRequest as any, mockResponse as Response),
      ).rejects.toThrow('Story not found');
    });
  });

  describe('updateStory', () => {
    it('should update story and return 200 status', async () => {
      const updateData = createUpdateStoryDto();
      const mockUpdatedStory = createMockStory({
        title: 'Updated Story Title',
        body: 'Updated story body.',
      });

      mockRequest.params = { storyId: 'story-uuid-123' };
      mockRequest.body = updateData;
      mockStoryService.updateStory = jest.fn().mockResolvedValue(mockUpdatedStory);

      await storyController.updateStory(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockStoryService.updateStory).toHaveBeenCalledWith('story-uuid-123', updateData);
    });

    it('should propagate error when update fails', async () => {
      mockRequest.params = { storyId: 'invalid-id' };
      mockRequest.body = createUpdateStoryDto();
      mockStoryService.updateStory = jest.fn().mockRejectedValue(new Error('Update failed'));

      await expect(storyController.updateStory(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('deleteStory', () => {
    it('should delete story and return 204 status', async () => {
      mockRequest.params = { storyId: 'story-uuid-123' };
      mockStoryService.deleteStory = jest.fn().mockResolvedValue(undefined);

      await storyController.deleteStory(mockRequest as any, mockResponse as Response);

      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
      expect(mockStoryService.deleteStory).toHaveBeenCalledWith('story-uuid-123');
    });

    it('should propagate error when delete fails', async () => {
      mockRequest.params = { storyId: 'invalid-id' };
      mockStoryService.deleteStory = jest.fn().mockRejectedValue(new Error('Delete failed'));

      await expect(storyController.deleteStory(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
